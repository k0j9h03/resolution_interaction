    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let img = new Image();
    img.src = 'bird.jpg'; 

    let mouseX = 0, mouseY = 0;
    let imgX = 0, imgY = 0; 
    let lerpAmount = 0.2; // Lerp  (0~ 1)
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
            const imgOffsetX = -40; 
            const imgPositionX = mouseX + imgOffsetX; 
            const imgPositionY = mouseY - alertImg.height / 2; 
    
            if(alertImg.complete){
                ctx.drawImage(alertImg, imgPositionX, imgPositionY);
            } else {
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
