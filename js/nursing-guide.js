/* =========================================================
   解説ページ 共通JavaScript
   nursing-guide.js
   ========================================================= */


/* =========================================================
   看護ツール紹介ポップアップ
   ========================================================= */

const floatingTool =
  document.getElementById("floatingTool");


/* =========================================================
   ポップアップ表示位置
   ページを20%ほどスクロールしたら表示
   ========================================================= */

const popupScrollRatio = 0.20;


/* =========================================================
   スクロール量を取得
   ========================================================= */

function getScrollRatio() {

  const scrollTop =
    window.scrollY;

  const documentHeight =
    document.documentElement.scrollHeight;

  const windowHeight =
    window.innerHeight;

  const scrollableHeight =
    documentHeight - windowHeight;


  if (scrollableHeight <= 0) {
    return 0;
  }


  return (
    scrollTop /
    scrollableHeight
  );
}


/* =========================================================
   ポップアップ表示
   ========================================================= */

function showFloatingTool() {

  if (!floatingTool) {
    return;
  }


  floatingTool.classList.add(
    "is-visible"
  );
}


/* =========================================================
   ポップアップを閉じる
   ========================================================= */

function closeFloatingTool() {

  if (!floatingTool) {
    return;
  }


  floatingTool.classList.remove(
    "is-visible"
  );


  /*
   * このページを見ている間は
   * 再表示しない
   */

  sessionStorage.setItem(
    "floatingToolClosed",
    "true"
  );
}


/* =========================================================
   スクロール監視
   ========================================================= */

function handleScroll() {

  if (!floatingTool) {
    return;
  }


  /*
   * 一度閉じた場合は表示しない
   */

  const closed =
    sessionStorage.getItem(
      "floatingToolClosed"
    );


  if (closed === "true") {
    return;
  }


  const scrollRatio =
    getScrollRatio();


  if (
    scrollRatio >= popupScrollRatio
  ) {

    showFloatingTool();


    /*
     * 一度表示したら
     * スクロール監視を終了
     */

    window.removeEventListener(
      "scroll",
      handleScroll
    );
  }
}


/* =========================================================
   スクロールイベント
   ========================================================= */

window.addEventListener(
  "scroll",
  handleScroll,
  {
    passive: true
  }
);


/* =========================================================
   初期状態
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    if (!floatingTool) {
      return;
    }


    /*
     * 閉じた状態を確認
     */

    const closed =
      sessionStorage.getItem(
        "floatingToolClosed"
      );


    if (closed === "true") {
      return;
    }


    /*
     * すでに20%以上スクロールされた状態で
     * ページが読み込まれた場合にも表示
     */

    if (
      getScrollRatio() >=
      popupScrollRatio
    ) {

      showFloatingTool();


      window.removeEventListener(
        "scroll",
        handleScroll
      );
    }

  }
);
