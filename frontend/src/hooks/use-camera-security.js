import { useEffect } from "react";

export const useCameraSecurity = () => {
  useEffect(() => {
    // Disable drag and drop of files
    const handleDragOver = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();

      // Show warning if user tries to drop files
      if (e.dataTransfer.files.length > 0) {
        alert(
          "File uploads are not allowed. Please use the camera to take a live photo."
        );
      }
    };

    // Disable paste of images
    const handlePaste = (e) => {
      const items = e.clipboardData?.items;
      if (items) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf("image") !== -1) {
            e.preventDefault();
            e.stopPropagation();
            alert(
              "Pasting images is not allowed. Please use the camera to take a live photo."
            );
            break;
          }
        }
      }
    };

    // Add event listeners
    document.addEventListener("dragover", handleDragOver);
    document.addEventListener("drop", handleDrop);
    document.addEventListener("paste", handlePaste);

    // Cleanup
    return () => {
      document.removeEventListener("dragover", handleDragOver);
      document.removeEventListener("drop", handleDrop);
      document.removeEventListener("paste", handlePaste);
    };
  }, []);

  // Function to validate if image was taken with camera (basic check)
  const validateCameraPhoto = (blob) => {
    return new Promise((resolve) => {
      // Check if blob has recent timestamp (within last few minutes)
      const now = Date.now();
      const blobTime = blob.lastModified || now;
      const timeDiff = now - blobTime;

      // If image is older than 5 minutes, it might be from gallery
      const isRecent = timeDiff < 5 * 60 * 1000; // 5 minutes

      resolve({
        isValid: isRecent,
        reason: isRecent
          ? "Valid camera photo"
          : "Image appears to be from gallery or too old",
      });
    });
  };

  return {
    validateCameraPhoto,
  };
};
