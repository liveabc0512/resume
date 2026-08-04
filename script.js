document.addEventListener('DOMContentLoaded', () => {
    // --------------------------------------------------
    // 1. Theme Toggle (Dark / Light)
    // --------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

    // Check system preference or stored theme
    const savedTheme = localStorage.getItem('cyw_theme') || 'light';
    setTheme(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }

    function setTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('cyw_theme', theme);

        if (themeIcon) {
            if (theme === 'dark') {
                themeIcon.className = 'fa-solid fa-sun';
            } else {
                themeIcon.className = 'fa-solid fa-moon';
            }
        }
    }

    // --------------------------------------------------
    // 2. HR 30-Sec Skim Mode Toggle
    // --------------------------------------------------
    const skimToggleBtn = document.getElementById('skim-toggle');
    let skimModeActive = false;

    if (skimToggleBtn) {
        skimToggleBtn.addEventListener('click', () => {
            skimModeActive = !skimModeActive;
            document.body.classList.toggle('skim-mode-active', skimModeActive);
            skimToggleBtn.classList.toggle('active', skimModeActive);

            if (skimModeActive) {
                // Scroll smoothly to HR Highlights
                const highlightsSection = document.getElementById('highlights');
                if (highlightsSection) {
                    highlightsSection.scrollIntoView({ behavior: 'smooth' });
                }

                showToast('已開啟 30 秒 HR 速覽模式：核心優勢已精準亮點標示！');
            } else {
                showToast('已切換回完整簡歷模式');
            }
        });
    }

    // --------------------------------------------------
    // 3. Bio Interactive Tabs
    // --------------------------------------------------
    const bioTabs = document.querySelectorAll('.bio-tab');
    const bioChapters = document.querySelectorAll('.bio-chapter');

    bioTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.getAttribute('data-target');

            // Remove active class from all tabs and chapters
            bioTabs.forEach(t => t.classList.remove('active'));
            bioChapters.forEach(c => c.classList.remove('active'));

            // Activate current tab and chapter
            tab.classList.add('active');
            const targetChapter = document.getElementById(targetId);
            if (targetChapter) {
                targetChapter.classList.add('active');
            }
        });
    });

    // --------------------------------------------------
    // 4. One-click Email Copy with Toast Notification
    // --------------------------------------------------
    const copyEmailBtn = document.getElementById('btn-copy-email');
    const emailLink = document.getElementById('email-link');
    const toast = document.getElementById('toast');

    if (copyEmailBtn && emailLink) {
        copyEmailBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const emailText = 'mary71132@gmail.com';

            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(emailText).then(() => {
                    showToast('已成功複製 Email：mary71132@gmail.com');
                }).catch(err => {
                    fallbackCopyTextToClipboard(emailText);
                });
            } else {
                fallbackCopyTextToClipboard(emailText);
            }
        });
    }

    function fallbackCopyTextToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.top = '0';
        textArea.style.left = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            showToast('已成功複製 Email：mary71132@gmail.com');
        } catch (err) {
            console.error('Fallback copy failed', err);
        }
        document.body.removeChild(textArea);
    }

    function showToast(message) {
        if (!toast) return;
        toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${message}`;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // --------------------------------------------------
    // 5. Navbar Sticky Scroll Elevation Effect
    // --------------------------------------------------
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
});
