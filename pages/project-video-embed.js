(() => {
  const iframes = document.querySelectorAll('iframe[src*="player.bilibili.com"]');
  if (!iframes.length) return;

  iframes.forEach((iframe, index) => {
    const src = iframe.getAttribute("src");
    if (!src) return;

    iframe.dataset.src = src;
    iframe.removeAttribute("src");
    iframe.setAttribute("title", `Bilibili 视频播放器 ${index + 1}`);
    iframe.classList.add("bili-iframe-idle");

    const container = iframe.parentElement;
    if (!container) return;

    const poster = iframe.dataset.poster;
    if (poster) {
      container.style.setProperty("--video-poster", `url("${poster}")`);
      container.classList.add("has-poster");
    }

    const button = document.createElement("button");
    button.type = "button";
    button.className = "bili-activate";
    button.setAttribute("aria-label", "点击开始播放视频");
    button.innerHTML = '<span class="play-icon">▶</span><span>点击播放</span>';

    const activate = () => {
      iframe.src = iframe.dataset.src;
      iframe.classList.remove("bili-iframe-idle");
      button.remove();
    };

    button.addEventListener("click", activate);
    container.appendChild(button);
  });
})();
