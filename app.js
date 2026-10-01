document.addEventListener('DOMContentLoaded', () => {
  // Tab Switcher
  const switcherBtns = document.querySelectorAll('.switcher-btn');
  const viewPanels = document.querySelectorAll('.view-panel');
  
  switcherBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      
      switcherBtns.forEach(b => b.classList.remove('active'));
      viewPanels.forEach(p => p.classList.remove('active'));
      
      btn.classList.add('active');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  // Toast Functionality
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  let toastTimeout;

  function showToast(message) {
    if (toastTimeout) clearTimeout(toastTimeout);
    toastMessage.textContent = message;
    toast.classList.remove('hidden');
    
    toastTimeout = setTimeout(() => {
      toast.classList.add('hidden');
    }, 3200);
  }

  // Copy README button
  const btnCopyReadme = document.getElementById('btn-copy-readme');
  if (btnCopyReadme) {
    btnCopyReadme.addEventListener('click', async () => {
      try {
        const response = await fetch('README.md');
        if (!response.ok) throw new Error('Could not fetch README');
        const text = await response.text();
        await navigator.clipboard.writeText(text);
        showToast('README.md copied to clipboard!');
      } catch (err) {
        // Fallback: Copy via fallback text
        const fallbackText = `# Thevinu Gunawardena\nUI/UX Designer | Full-Stack Developer | DevOps Enthusiast\nhttps://thevinuvinan.com/`;
        await navigator.clipboard.writeText(fallbackText);
        showToast('README copied to clipboard!');
      }
    });
  }

  // Copy Git Commands
  const btnCopyCommands = document.getElementById('btn-copy-commands');
  if (btnCopyCommands) {
    btnCopyCommands.addEventListener('click', async () => {
      const commands = `git init\ngit add .\ngit commit -m "feat: add GitHub profile welcome screen"\ngit branch -M main\ngit remote add origin https://github.com/ThevinuGunawardena/ThevinuGunawardena.git\ngit push -u origin main`;
      try {
        await navigator.clipboard.writeText(commands);
        btnCopyCommands.textContent = 'Copied!';
        showToast('Git commands copied!');
        setTimeout(() => {
          btnCopyCommands.textContent = 'Copy Commands';
        }, 2000);
      } catch (err) {
        console.error('Failed to copy', err);
      }
    });
  }
});
