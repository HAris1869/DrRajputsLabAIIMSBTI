/* ============================================================
   PUBLICATIONS.JS — Filter Logic
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.pub-filter-btn');
  const pubItems = document.querySelectorAll('.pub-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      pubItems.forEach(item => {
        const year = item.dataset.year;
        const topic = item.dataset.topic;

        let show = false;
        if (filter === 'all') {
          show = true;
        } else if (!isNaN(Number(filter))) {
          show = year === filter;
        } else {
          show = topic === filter;
        }

        if (show) {
          item.style.display = '';
          // Re-trigger reveal animation
          setTimeout(() => {
            item.classList.add('visible');
          }, 50);
        } else {
          item.style.display = 'none';
          item.classList.remove('visible');
        }
      });
    });
  });
});
