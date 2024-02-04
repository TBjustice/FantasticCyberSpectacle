(function(){
  let video = null;
  const errorIcon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
	<path d="M 8 0 A 1 1 0 0 0 8 16 A 1 1 0 0 0 8 0 Z" fill="red"/>
  <path d="M 3 4 L 4 3 L 8 7 L 12 3 L 13 4 L 9 8 L 13 12 L 12 13 L 8 9 L 4 13 L 3 12 L 7 8 Z" fill="white"/>
</svg>
`;
  const warnIcon=`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 17">
	<path d="M 11 0 L 0 17 L 23 17 Z" fill="#ffff00"/>
  <path d=" M 10 5 L 12 5 L 12 13 L 10 13 Z M 10 14 L 12 14 L 12 16 L 10 16 L 10 16 Z" fill="black"/>
</svg>
  `;
  let errorShowTimings = [];
  for(let i = 0; i < 20; ++i){
    errorShowTimings.push({time:i * 3.9 / 20, isShown:false});
  }
  class TextShowTiming{
    constructor(time, text, type){
      this.isShown = false;
      this.time = time;
      this.text = text;
      this.type = type;
    }
  }
  let textShowTimings = [
    new TextShowTiming(22.0, "人生はどうだって", 'K'),
    new TextShowTiming(23.6, "上手くいかなくたって", 'K'),
    new TextShowTiming(26.4, "大器晩成で", 'K'),
    new TextShowTiming(28.1, "創造する", 'K'),
    new TextShowTiming(30.7, "人の世はどうだって", 'T'),
    new TextShowTiming(31.9, "占って見たって", 'T'),
    new TextShowTiming(34.1, "運命の輪廻", 'T'),
    new TextShowTiming(35.5, "隠している", 'T'),
    new TextShowTiming(39.0, "数字が正義だと信じて", 'K'),
    new TextShowTiming(41.5, "大切なモノを何か失くして", 'K'),
    new TextShowTiming(89.7, "人生は統計値", 'T'),
    new TextShowTiming(91.0, "答えは何処にあるのって", 'T'),
    new TextShowTiming(93.5, "紐解いてみたって", 'T'),
    new TextShowTiming(95.5, "解のない", 'T'),
    new TextShowTiming(98.0, "このまま私は", 'K'),
    new TextShowTiming(100.0, "何が出来るの", 'K'),
    new TextShowTiming(101.0, "何回も説いて", 'K'),
    new TextShowTiming(103.0, "まだまだ", 'K'),
  ];
  function createFrame(position, size, mainColor, titleColor){
    const frame = document.createElement('div');
    frame.classList.add('fantastic-cyber-spectacle');
    frame.classList.add('fantastic-cyber-spectacle-window');
    frame.style.left = '' + position[0] + 'px';
    frame.style.top = '' + position[1] + 'px';
    frame.style.width = '' + size[0] + 'px';
    frame.style.height = '' + size[1] + 'px';

    const content = document.createElement('div');
    content.classList.add('fantastic-cyber-spectacle-content');
    content.style.background = mainColor;

    const title = document.createElement('div');
    title.classList.add('fantastic-cyber-spectacle-title');
    title.style.background = titleColor;

    document.body.appendChild(frame);
    frame.appendChild(title);
    frame.appendChild(content);

    return {title:title, content: content}
  }
  function createTitleText(value){
    const titleText = document.createElement('div');
    titleText.classList.add('fantastic-cyber-spectacle-title-text');
    titleText.innerText = value;
    return titleText;
  }
  function createCloseButton(color, bkcolor='transparent'){
    const closeButton = document.createElement('div');
    closeButton.classList.add('fantastic-cyber-spectacle-title-close');
    closeButton.innerText = '×';
    closeButton.style.borderColor = color;
    closeButton.style.color = color;
    closeButton.style.backgroundColor = bkcolor;
    closeButton.addEventListener('click', (e)=>{
      let target = e.currentTarget;
      let frame = target.parentElement.parentElement
      document.body.removeChild(frame);
    });
    return closeButton;
  }
  function Loop(){
    if(video == null)return;
    const time = video.currentTime;
    
    for (const errorShowTiming of errorShowTimings){
      if(errorShowTiming.time < time && (!errorShowTiming.isShown)){
        errorShowTiming.isShown = true;
        frame = createFrame([Math.random() * (window.innerWidth - 400), Math.random() * (window.innerHeight - 150)], [400, 150], '#FFFFFF', 'linear-gradient(to right,#FF0000,#FFFF00,#00FF00,#00FFFF,#0000FF,#FF00FF)');
        frame.title.appendChild(createTitleText('Error'));
        frame.title.appendChild(createCloseButton('black', '#ddd'));
        if(Math.random() < 0.5) frame.content.innerHTML = errorIcon;
        else frame.content.innerHTML = warnIcon;
      }
    }
    for (const textShowTiming of textShowTimings){
      if(textShowTiming.time < time && (!textShowTiming.isShown)){
        textShowTiming.isShown = true;
        let mainColor = '#FDFDEA';
        let titleColor = '#40D285';
        let buttonColor = '#CFFF59';
        let textColor = '#76FE38';
        if(textShowTiming.type == 'T'){
          mainColor = '#FEE8F6';
          titleColor = '#753FD6';
          buttonColor = '#D037A3';
          textColor = '#F6318D';
        }
        let width = textShowTiming.text.length * 60;
        frame = createFrame([Math.random() * (window.innerWidth - width), Math.random() * (window.innerHeight - 120)], [width, 120], mainColor, titleColor);
        frame.title.appendChild(createCloseButton(buttonColor));
        frame.content.style.fontSize = '5rem';
        frame.content.style.color = textColor;
        frame.content.innerText = textShowTiming.text;
      }
    }


    requestAnimationFrame(Loop);
  }

  function initialize(){
    video = null;
    if(window.location.href != 'https://www.youtube.com/watch?v=IH8zcxIef6s') return;
    const video_elements = document.querySelectorAll('.video-stream.html5-main-video');
    if(video_elements.length == 0)return;
    video = video_elements[0];
    Loop();
  }

  let prevUrl = window.location.href;
  setInterval(()=>{
    const currUrl = window.location.href;
    if(prevUrl != currUrl) {
      prevUrl = currUrl;
      initialize();
    }
  }, 100);
  initialize();
})();
