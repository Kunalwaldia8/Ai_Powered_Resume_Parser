document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("upload-form");
  const resumeInput = document.getElementById("resumes");
  const fileList = document.getElementById("file-list");
  const submitBtn = document.getElementById("submit-btn");
  const loading = document.getElementById("loading");
  const errorMessage = document.getElementById("error-message");

  // Display selected resume files
  resumeInput.addEventListener("change", function () {
    fileList.innerHTML = "";

    if (this.files.length > 0) {
      for (let i = 0; i < this.files.length; i++) {
        const file = this.files[i];
        const fileItem = document.createElement("div");
        fileItem.className = "file-item";
        fileItem.innerHTML = `
                    <span>${file.name}</span>
                    <span>${formatFileSize(file.size)}</span>
                `;
        fileList.appendChild(fileItem);
      }
    }
  });

  // Handle form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Show loading indicator
    loading.classList.remove("hidden");
    errorMessage.classList.add("hidden");
    submitBtn.disabled = true;

    // Create FormData object
    const formData = new FormData(form);

    // Send AJAX request
    fetch("/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          // Show error message
          errorMessage.textContent = data.error;
          errorMessage.classList.remove("hidden");
          loading.classList.add("hidden");
          submitBtn.disabled = false;
        } else if (data.redirect) {
          // Redirect to results page
          window.location.href = data.redirect;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        errorMessage.textContent = "An error occurred. Please try again.";
        errorMessage.classList.remove("hidden");
        loading.classList.add("hidden");
        submitBtn.disabled = false;
      });
  });

  // Helper function to format file size
  function formatFileSize(bytes) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }
});
