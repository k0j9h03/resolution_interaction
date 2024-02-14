    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let img = new Image();
    img.src = 'bird.jpg'; 

    let mouseX = 0, mouseY = 0;
    let imgX = 0, imgY = 0; 
    let lerpAmount = 0.15; // Lerp  (0~ 1)
    let alertImg = new Image(); // 경고 이미지 로드
    alertImg.src = 'alert.png'; // 경고 이미지의 경로를 설정하세요.

    // 마우스 위치 업데이트
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        draw(); 
    });

    //리사이즈 대응
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        draw(); 
    }

    window.addEventListener('resize', resizeCanvas);

    function lerp(start, end, amt) {
        return start + (end - start) * amt;
    }

    function alertAlarm(scaledWidth){
        if(scaledWidth <= 15){
            const imgOffsetX = -40; // 이미지를 마우스 우측에 위치시킬 X 오프셋
            const imgPositionX = mouseX + imgOffsetX; // 이미지의 X 위치
            const imgPositionY = mouseY - alertImg.height / 2; // 마우스 Y 위치에서 이미지의 높이 절반을 빼서 세로 중앙에 위치시킴
    
            // 이미지가 로드되었는지 확인하고, 준비된 이미지를 마우스 포인터 오른쪽에 그립니다.
            if(alertImg.complete){
                ctx.drawImage(alertImg, imgPositionX, imgPositionY);
            } else {
                // 이미지가 아직 로드되지 않았다면, 로드 완료 후 그리기 위해 이벤트 리스너를 추가합니다.
                alertImg.onload = function() {
                    ctx.drawImage(alertImg, imgPositionX, imgPositionY);
                };
            }
        }
    }

    function draw() {
    const pixelation = Math.max(1, 20 * (1 - mouseX / canvas.width * 1.5));

    // Lerp 리턴값 이용 
    imgX = lerp(imgX, mouseX - 200 / 2, lerpAmount);
    imgY = lerp(imgY, mouseY - 200 / 2, lerpAmount);

    ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스

    const size = 200; // 이미지 크기 기억하기
    const scaledWidth = size / pixelation;
    const scaledHeight = size / pixelation;

    // 이미지의 픽셀화 
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = scaledWidth;
    tempCanvas.height = scaledHeight;


    // 임시 캔버스에 이미지 출력
    tempCtx.drawImage(img, 0, 0, scaledWidth, scaledHeight);

    ctx.drawImage(tempCanvas, 0, 0, scaledWidth, scaledHeight, imgX, imgY, size, size);
    alertAlarm(scaledWidth);
}
    //초기 그리기
    img.onload = function() {
        draw(); 
    };

    window.onload = function() {
    alert("마우스를 좌우로 움직여보세요!");
};
