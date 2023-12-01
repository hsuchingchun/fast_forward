let audioChunks;
let mediaRecorder;
let lastRecordedBlob;
let playbackRate = 3;

    // 獲取麥克風許可權並開始錄音
    document.getElementById('startRecord').addEventListener('click', async () => {
      const startButton = document.getElementById('startRecord');
      startButton.disabled = true;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder = new MediaRecorder(stream);
      audioChunks = [];
      document.getElementById('recordingIndicator').style.display = 'block';

      mediaRecorder.ondataavailable = e => {
        audioChunks.push(e.data);
      };

      mediaRecorder.start();
      document.getElementById('stopRecord').disabled = false;
      document.getElementById('playbackSpeed').disabled = false;
    });

    // 停止錄音
    document.getElementById('stopRecord').addEventListener('click', () => {
      mediaRecorder.stop();
      mediaRecorder.onstop = () => {
        lastRecordedBlob = new Blob(audioChunks, { 'type': 'audio/wav' });
        const audio = new Audio(URL.createObjectURL(lastRecordedBlob));
        audio.playbackRate = playbackRate; // 設置播放速度為三倍
        audio.play();
        document.getElementById('recordingIndicator').style.display = 'none';
        document.getElementById('replayRecord').disabled = false;
        document.getElementById('startRecord').disabled = false;
        document.getElementById('playbackSpeed').disabled = false;
    };
      document.getElementById('stopRecord').disabled = true;
    });

    // 重播錄音
    document.getElementById('replayRecord').addEventListener('click', () => {
      if (lastRecordedBlob) {
        const audio = new Audio(URL.createObjectURL(lastRecordedBlob));
        audio.playbackRate =  playbackRate;
        audio.play();
      }
    });

     // 更新播放速度及顯示數字值
     const speedInput = document.getElementById('playbackSpeed');
     const speedValue = document.getElementById('speedValue');
     speedInput.addEventListener('input', (event) => {
       playbackRate = parseFloat(event.target.value);
       speedValue.textContent = playbackRate;
     });