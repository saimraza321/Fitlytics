import Swal from "sweetalert2";

// ✅ Global default configuration
Swal.mixin({
  // Button colors
  confirmButtonColor: "#84cc16", // Lime green
  cancelButtonColor: "#ef4444",  // Red
  
  // Button text colors
  confirmButtonText: "Yes",
  cancelButtonText: "Cancel",
  
  // Custom classes for better visibility
  customClass: {
    popup: "swal-custom-popup",
    title: "swal-custom-title",
    htmlContainer: "swal-custom-text",
    confirmButton: "swal-custom-confirm",
    cancelButton: "swal-custom-cancel",
  },
});

// ✅ Export configured Swal
export default Swal;