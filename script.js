(function () {
    if (
    !"mediaDevices" in navigator ||
    !"getUserMedia" in navigator.mediaDevices
    ) {
    alert("Camera API is not available in your browser");
    return;
    }

    // get page elements
    const video = document.querySelector("#video");
    const btnPlay = document.querySelector("#btnPlay");
    const btnPause = document.querySelector("#btnPause");
    const btnScreenshot = document.querySelector("#btnScreenshot");
    const btnChangeCamera = document.querySelector("#btnChangeCamera");
    const screenshotsContainer = document.querySelector("#screenshots");
    const canvas = document.querySelector("#canvas");
    const devicesSelect = document.querySelector("#devicesSelect");

    // video constraints
    const constraints = {
    video: {
        width: {
        min: 1280,
        ideal: 1920,
        max: 2560,
        },
        height: {
        min: 720,
        ideal: 1080,
        max: 1440,
        },
    },
    };

    // use front face camera
    let useFrontCamera = true;

    // current video stream
    let videoStream;

    // handle events
    // play
    btnPlay.addEventListener("click", function () {
    video.play();
    btnPlay.classList.add("is-hidden");
    btnPause.classList.remove("is-hidden");
    });

    // pause
    btnPause.addEventListener("click", function () {
    video.pause();
    btnPause.classList.add("is-hidden");
    btnPlay.classList.remove("is-hidden");
    });

    // take screenshot
    btnScreenshot.addEventListener("click", function () {
        // const img = document.createElement("img");
        // canvas.width = video.videoWidth;
        // canvas.height = video.videoHeight;
        // canvas.getContext("2d").drawImage(video, 0, 0);
        // img.src = canvas.toDataURL("image/png");
        // screenshotsContainer.prepend(img);

        const video = document.getElementsByTagName("video")[0];
        const canvas = document.createElement("canvas");

        var width = video.videoWidth, height = video.videoHeight;
        canvas.width = width;
        canvas.height = height;
        
        var screenshot;
        canvas.getContext('2d').drawImage(video, 0, 0, width, height);

        var imgData = document.querySelector('.img1');     
        canvas.getContext('2d').drawImage(imgData, 0, 0, width, height);
        screenshot = canvas.toDataURL('image/png');
        
        var link = document.createElement('a');
        link.download = 'screenshot.png';
        link.href = screenshot;
        link.click();
    });

    // switch camera
    btnChangeCamera.addEventListener("click", function () {
    useFrontCamera = !useFrontCamera;

    initializeCamera();
    });

    // stop video stream
    function stopVideoStream() {
    if (videoStream) {
        videoStream.getTracks().forEach((track) => {
        track.stop();
        });
    }
    }

    // initialize
    async function initializeCamera() {
    stopVideoStream();
    constraints.video.facingMode = useFrontCamera ? "user" : "environment";

    try {
        videoStream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = videoStream;
    } catch (err) {
        alert("Could not access the camera");
    }
    }

    initializeCamera();
})();