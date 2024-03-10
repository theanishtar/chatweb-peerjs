const PRE = "DELTA";
const SUF = "MEET";
let room_id;
let local_stream;
let screenStream;
let peer = null;
let currentPeer = null;
let screenSharing = false;

function createRoom() {
    console.log("Creating Room");
    let room = document.getElementById("room-input").value.trim();
    if (!room) {
        alert("Please enter a room number");
        return;
    }
    room_id = `${PRE}${room}${SUF}`;
    // Rest of the function remains the same...
}

function setLocalStream(stream) {
    let video = document.getElementById("local-video");
    video.srcObject = stream;
    video.muted = true;
    video.play();
}

function setRemoteStream(stream) {
    let video = document.getElementById("remote-video");
    video.srcObject = stream;
    video.play();
}

function hideModal() {
    document.getElementById("entry-modal").hidden = true;
}

function notify(msg) {
    let notification = document.getElementById("notification");
    notification.innerHTML = msg;
    notification.hidden = false;
    setTimeout(() => {
        notification.hidden = true;
    }, 3000);
}

function joinRoom() {
    console.log("Joining Room");
    let room = document.getElementById("room-input").value.trim();
    if (!room) {
        alert("Please enter a room number");
        return;
    }
    room_id = `${PRE}${room}${SUF}`;
    // Rest of the function remains the same...
}

function startScreenShare() {
    if (screenSharing) {
        stopScreenSharing();
    }
    navigator.mediaDevices.getDisplayMedia({ video: true }).then((stream) => {
        screenStream = stream;
        let videoTrack = screenStream.getVideoTracks()[0];
        videoTrack.onended = () => {
            stopScreenSharing();
        };
        if (peer) {
            let sender = currentPeer.peerConnection.getSenders().find((s) => s.track.kind === videoTrack.kind);
            sender.replaceTrack(videoTrack);
            screenSharing = true;
        }
        console.log(screenStream);
    });
}

function stopScreenSharing() {
    if (!screenSharing) return;
    let videoTrack = local_stream.getVideoTracks()[0];
    if (peer) {
        let sender = currentPeer.peerConnection.getSenders().find((s) => s.track.kind === videoTrack.kind);
        sender.replaceTrack(videoTrack);
    }
    screenStream.getTracks().forEach((track) => {
        track.stop();
    });
    screenSharing = false;
}
