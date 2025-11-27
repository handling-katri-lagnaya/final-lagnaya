import { useState, useRef, useCallback, useEffect } from "react";
import { Camera, RotateCcw, Check, X, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useCameraSecurity } from "@/hooks/use-camera-security";

const CameraPhotoUpload = ({ onPhotoCapture, required = false }) => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [error, setError] = useState("");
  const { validateCameraPhoto } = useCameraSecurity();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const startCamera = useCallback(async () => {
    try {
      setError("");
      console.log("Starting camera...");

      // Check if getUserMedia is available
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Camera API not supported");
      }

      // Request camera access with specific constraints
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user", // Front camera preferred for profile photos
        },
        audio: false,
      });

      console.log("Camera stream obtained:", stream);

      // Set streaming state immediately when we get the stream
      setIsStreaming(true);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;

        // Wait for video to be ready and play
        videoRef.current.onloadedmetadata = async () => {
          console.log("Video metadata loaded");
          try {
            await videoRef.current.play();
            console.log("Video started playing");
            setIsVideoReady(true);
          } catch (playError) {
            console.error("Error playing video:", playError);
            setError("Error starting camera feed. Please try again.");
          }
        };

        // Additional event to ensure video is playing
        videoRef.current.onplaying = () => {
          console.log("Video is now playing");
          setIsVideoReady(true);
        };

        // Debug: Log video dimensions when they change
        videoRef.current.onresize = () => {
          console.log("Video dimensions:", {
            videoWidth: videoRef.current.videoWidth,
            videoHeight: videoRef.current.videoHeight,
            readyState: videoRef.current.readyState,
          });
        };

        // Handle video errors
        videoRef.current.onerror = (e) => {
          console.error("Video error:", e);
          setError("Error loading camera feed. Please try again.");
        };

        // Fallback: Force video ready state after 3 seconds
        setTimeout(() => {
          if (videoRef.current && videoRef.current.srcObject && !isVideoReady) {
            console.log("Forcing video ready state after timeout");
            setIsVideoReady(true);
          }
        }, 3000);

        // Also try to play immediately if metadata is already loaded
        if (videoRef.current.readyState >= 1) {
          try {
            await videoRef.current.play();
            console.log("Video started playing immediately");
            setIsVideoReady(true);
          } catch (playError) {
            console.error("Error playing video immediately:", playError);
          }
        }
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      if (err.name === "NotAllowedError") {
        setError(
          "Camera access denied. Please allow camera permissions to take your profile photo."
        );
      } else if (err.name === "NotFoundError") {
        setError("No camera found on this device.");
      } else if (err.name === "NotSupportedError") {
        setError("Camera is not supported on this browser.");
      } else {
        setError(`Unable to access camera: ${err.message}`);
      }
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsStreaming(false);
    setIsVideoReady(false);
  }, []);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Flip the image horizontally to match the mirrored video
    context.scale(-1, 1);
    context.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
    context.scale(-1, 1); // Reset the scale

    // Convert to blob
    canvas.toBlob(
      (blob) => {
        if (blob) {
          const photoUrl = URL.createObjectURL(blob);
          setCapturedPhoto(photoUrl);
          stopCamera();

          console.log("Photo captured successfully:", {
            size: blob.size,
            type: blob.type,
            timestamp: new Date().toISOString(),
          });

          // Call the parent callback with the photo data
          onPhotoCapture &&
            onPhotoCapture({
              blob,
              url: photoUrl,
              timestamp: new Date().toISOString(),
            });
        }
      },
      "image/jpeg",
      0.8
    );
  }, [onPhotoCapture, stopCamera]);

  const retakePhoto = useCallback(() => {
    if (capturedPhoto) {
      URL.revokeObjectURL(capturedPhoto);
      setCapturedPhoto(null);
    }
    startCamera();
  }, [capturedPhoto, startCamera]);

  const confirmPhoto = useCallback(() => {
    // Photo is already captured and sent to parent
    // This is just for UI confirmation
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
      if (capturedPhoto) {
        URL.revokeObjectURL(capturedPhoto);
      }
    };
  }, [stopCamera, capturedPhoto]);

  // Check if camera is supported
  const isCameraSupported =
    navigator.mediaDevices && navigator.mediaDevices.getUserMedia;

  // Debug function to check camera permissions
  const checkCameraPermissions = useCallback(async () => {
    try {
      const result = await navigator.permissions.query({ name: "camera" });
      console.log("Camera permission status:", result.state);
      return result.state;
    } catch (err) {
      console.log("Permission API not supported:", err);
      return "unknown";
    }
  }, []);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-sm font-medium">
          Profile Photo {required && "*"}
        </Label>
        <p className="text-xs text-muted-foreground">
          📸 Take a live photo using your camera. Gallery photos are not allowed
          for verification purposes.
        </p>
      </div>

      <Card className="border-border/50">
        <CardContent className="p-4">
          {!isCameraSupported && (
            <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm text-destructive">
                Camera is not supported on this device or browser. Please use a
                device with camera support.
              </p>
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {!isStreaming && !capturedPhoto && isCameraSupported && (
            <div className="text-center py-8">
              <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <Camera className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-medium mb-2">Take Your Profile Photo</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Click below to open your camera and take a live photo
              </p>
              <div className="space-y-2">
                <Button onClick={startCamera} className="w-full sm:w-auto">
                  <Camera className="h-4 w-4 mr-2" />
                  Open Camera
                </Button>
                <div className="flex gap-2 justify-center">
                  <Button
                    onClick={checkCameraPermissions}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                  >
                    Check Permissions
                  </Button>
                  <Button
                    onClick={() => {
                      console.log("Video element info:", {
                        videoRef: !!videoRef.current,
                        srcObject: !!videoRef.current?.srcObject,
                        videoWidth: videoRef.current?.videoWidth,
                        videoHeight: videoRef.current?.videoHeight,
                        readyState: videoRef.current?.readyState,
                        paused: videoRef.current?.paused,
                      });
                    }}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                  >
                    Debug Info
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Make sure to allow camera permissions when prompted
                </p>
              </div>
            </div>
          )}

          {isStreaming && (
            <div className="space-y-4">
              <div className="relative bg-black rounded-lg overflow-hidden min-h-[300px] flex items-center justify-center">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full min-h-[300px] object-cover"
                  style={{
                    transform: "scaleX(-1)",
                    maxHeight: "400px",
                  }}
                />
                <div className="absolute inset-0 border-2 border-dashed border-white/30 m-4 rounded-lg pointer-events-none" />
                {/* Loading indicator - show when video is not ready */}
                {!isVideoReady && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <div className="text-white text-center">
                      <Camera className="h-8 w-8 mx-auto mb-2 animate-pulse" />
                      <p className="text-sm">Loading camera...</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-2 justify-center">
                <Button
                  onClick={capturePhoto}
                  size="lg"
                  disabled={!isVideoReady}
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Capture Photo
                </Button>
                <Button onClick={stopCamera} variant="outline" size="lg">
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>

              <p className="text-xs text-center text-muted-foreground">
                Position yourself in the frame and click "Capture Photo"
              </p>
            </div>
          )}

          {capturedPhoto && (
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={capturedPhoto}
                  alt="Captured profile"
                  className="w-full h-auto max-h-80 object-cover rounded-lg"
                />
                <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full">
                  <Check className="h-4 w-4" />
                </div>
              </div>

              <div className="flex gap-2 justify-center">
                <Button
                  onClick={confirmPhoto}
                  size="lg"
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Use This Photo
                </Button>
                <Button onClick={retakePhoto} variant="outline" size="lg">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Retake
                </Button>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-sm text-green-800 text-center">
                  ✓ Photo captured successfully! This will be used for your
                  profile verification.
                </p>
              </div>
            </div>
          )}

          {/* Hidden canvas for photo capture */}
          <canvas ref={canvasRef} className="hidden" />
        </CardContent>
      </Card>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <div className="flex items-start gap-2">
          <Shield className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-blue-800">
              <strong>Why camera-only photos?</strong>
              <br />
              We require live camera photos to ensure profile authenticity and
              prevent the use of fake or outdated images.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
        <p className="text-xs text-amber-800">
          <strong>Security Notice:</strong> File uploads, drag & drop, and image
          pasting are disabled. Only live camera photos are accepted.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-xs text-red-800 font-medium mb-2">
            Troubleshooting Tips:
          </p>
          <ul className="text-xs text-red-700 space-y-1 list-disc list-inside">
            <li>
              Make sure you're using HTTPS (camera requires secure connection)
            </li>
            <li>Click "Allow" when prompted for camera permissions</li>
            <li>Check if another app is using your camera</li>
            <li>Try refreshing the page and clicking "Open Camera" again</li>
            <li>Ensure your browser supports camera access</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default CameraPhotoUpload;
