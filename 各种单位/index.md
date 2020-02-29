### vw,vh
 - vw是相对视口（viewport）的宽度而定的，长度等于视口宽度的1/100。

### rem rem是相对于根元素（html）的字体大小（font-size）来计算的长度单位。
- 淘宝(10rem * fzpx = 640px) 这次咱们还是拿iPhone5（640px）的设计稿举例，淘宝的思想是无论当前页面多宽，让10rem = 页面宽度 = 100%，所以1rem = 64px 然后通过dpr设置缩放整个页面，以达到高保真的效果。
  iPhone5的宽度是640px，页面最终完成效果也是640px，iPhone的dpr是2，所以设置 `<meta name="viewport" content="initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no">` 就可以了适配iPhone5了
- 网易(6.4rem * fzpx = 640px / dpr) 首先网易的设计稿是基于iPhone5设计的也就是宽度640px。（先不考虑dpr的问题下面会说）然后设置1rem等于100px（ HTML font-size为100px），相当于6.4rem = 100%宽度 = 设备的宽度。
    由于是基于6.4rem开发。iPhone5  的物理像素是320px（dpr是2.0），如果此时还想让6.4rem等于设备宽度只能调整1rem对应font-size的比例， 320 / 6.4 = 50 让1rem=50px就可以实现。如果想让 iPhone6 适配只需要 1rem = （375 / 6.4） = 58.59375px 就可以实现iPhone6的适配，这个方法可以适配市面上绝大多数的移动端设备。 `document.documentElement.style.fontSize = document.documentElement.clientWidth / 6.4 + 'px';`

### em
 - em是相对于其父元素的字体大小，默认16px