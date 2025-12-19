// ========================================
// ハンバーガーメニューの制御
// ========================================

// ハンバーガーボタンとナビゲーションメニューを取得
const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('.nav');

// ハンバーガーボタンがクリックされた時の処理
hamburger.addEventListener('click', () => {
    // ハンバーガーボタンとナビゲーションメニューにactiveクラスをトグル
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
});

// ナビゲーションリンクがクリックされた時にメニューを閉じる
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // モバイルメニューを閉じる
        hamburger.classList.remove('active');
        nav.classList.remove('active');
    });
});

// ========================================
// スクロール時のフェードインアニメーション
// ========================================

// フェードイン対象の要素を取得
const fadeInElements = document.querySelectorAll('.section');

// Intersection Observer（要素が画面に入ったかを監視）の設定
const observerOptions = {
    root: null, // ビューポートを基準にする
    rootMargin: '0px',
    threshold: 0.1 // 要素の10%が見えたら発火
};

// オブザーバーのコールバック関数
const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        // 要素が画面に入ったら
        if (entry.isIntersecting) {
            // fade-inクラスを追加してアニメーション開始
            entry.target.classList.add('fade-in', 'visible');
            // 一度アニメーションしたら監視を解除（再度アニメーションしないため）
            observer.unobserve(entry.target);
        }
    });
};

// オブザーバーを作成
const observer = new IntersectionObserver(observerCallback, observerOptions);

// 各セクションを監視対象に追加
fadeInElements.forEach(element => {
    element.classList.add('fade-in'); // 初期状態で非表示
    observer.observe(element);
});

// ========================================
// スムーススクロール（リンク判定の強化版）
// ========================================

// すべてのナビゲーションリンクに対して処理を設定
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // リンク先のパスを取得
        const href = link.getAttribute('href');
        
        // 1. リンクに「#」が含まれていない場合（例: columns.html）
        //    → 別のページへの移動なので、JSは何もしない（ブラウザに任せる）
        if (href.indexOf('#') === -1) {
            return;
        }

        // 2. リンク先が現在のページ内に存在するか確認
        //    （例: index.html#about の #about 部分だけを取り出す）
        const hash = href.substring(href.indexOf('#'));
        const targetSection = document.querySelector(hash);
        
        // ターゲットが同じページ内に見つかった場合のみ、スクロールを実行
        if (targetSection) {
            // デフォルトのページ移動を無効化
            e.preventDefault();
            
            // スムーススクロールで移動
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // モバイルメニューが開いていたら閉じる
            hamburger.classList.remove('active');
            nav.classList.remove('active');
        }
        // 見つからない場合（例: columns.htmlからindex.html#aboutへのリンク）は
        // e.preventDefault() しないので、そのままページ遷移する
    });
});

// ========================================
// フォーム送信の処理（フェイク）
// ========================================

// フォーム要素を取得
const contactForm = document.getElementById('contactForm');

// フォームが送信された時の処理
contactForm.addEventListener('submit', (e) => {
    // デフォルトの送信動作を無効化
    e.preventDefault();
    
    // フォームの値を取得
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // コンソールに表示（実際の送信はしない）
    console.log('=== フォーム送信内容 ===');
    console.log('お名前:', name);
    console.log('メールアドレス:', email);
    console.log('メッセージ:', message);
    
    // アラートで送信完了を通知
    alert('お問い合わせありがとうございます！\n（※これはデモ用のフェイクフォームです。実際には送信されません）');
    
    // フォームをリセット
    contactForm.reset();
});

// ========================================
// ページ読み込み時の初期アニメーション
// ========================================

// ページが完全に読み込まれた時の処理
window.addEventListener('load', () => {
    // HEROセクションの要素を取得
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    // 既にCSSアニメーションが適用されているため、ここでは追加処理なし
    // 必要に応じて追加のアニメーションを実装可能
});

// ========================================
// スクロール時のヘッダー背景変更（オプション）
// ========================================

// スクロール位置に応じてヘッダーのスタイルを変更
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    
    // スクロール位置が50px以上の場合
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 6px 12px rgba(26, 58, 82, 0.15)';
    } else {
        header.style.boxShadow = '0 4px 6px rgba(26, 58, 82, 0.1)';
    }
});
