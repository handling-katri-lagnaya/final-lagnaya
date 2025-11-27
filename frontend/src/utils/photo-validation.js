// Photo validation utilities for camera-only uploads

export const validatePhotoSource = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const arrayBuffer = e.target.result;
      const uint8Array = new Uint8Array(arrayBuffer);

      // Check for EXIF data that might indicate camera source
      const hasExifData = checkExifData(uint8Array);

      // Check file creation time vs current time
      const isRecent = checkFileRecency(file);

      // Check file size (camera photos are usually larger)
      const hasReasonableSize = checkFileSize(file);

      resolve({
        isValid: hasExifData && isRecent && hasReasonableSize,
        checks: {
          hasExifData,
          isRecent,
          hasReasonableSize,
        },
        reason: getValidationReason(hasExifData, isRecent, hasReasonableSize),
      });
    };

    reader.readAsArrayBuffer(file);
  });
};

const checkExifData = (uint8Array) => {
  // Look for JPEG SOI marker
  if (uint8Array[0] === 0xff && uint8Array[1] === 0xd8) {
    // Look for EXIF marker
    for (let i = 2; i < uint8Array.length - 1; i++) {
      if (uint8Array[i] === 0xff && uint8Array[i + 1] === 0xe1) {
        return true; // Found EXIF data
      }
    }
  }
  return false;
};

const checkFileRecency = (file) => {
  if (!file.lastModified) return false;

  const now = Date.now();
  const fileTime = file.lastModified;
  const timeDiff = now - fileTime;

  // File should be created within the last 2 minutes
  return timeDiff < 2 * 60 * 1000;
};

const checkFileSize = (file) => {
  // Camera photos are usually at least 100KB
  return file.size > 100 * 1024;
};

const getValidationReason = (hasExifData, isRecent, hasReasonableSize) => {
  if (!hasExifData) return "Photo lacks camera metadata";
  if (!isRecent) return "Photo is not recent enough";
  if (!hasReasonableSize) return "Photo file size is too small";
  return "Photo validation passed";
};

// Additional security: Detect if user is trying to upload from file input
export const preventFileInput = () => {
  // Hide all file inputs on the page
  const fileInputs = document.querySelectorAll('input[type="file"]');
  fileInputs.forEach((input) => {
    input.style.display = "none";
    input.disabled = true;
  });

  // Monitor for new file inputs being added
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) {
          // Element node
          const fileInputs = node.querySelectorAll
            ? node.querySelectorAll('input[type="file"]')
            : [];
          fileInputs.forEach((input) => {
            input.style.display = "none";
            input.disabled = true;
          });
        }
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  return () => observer.disconnect();
};
