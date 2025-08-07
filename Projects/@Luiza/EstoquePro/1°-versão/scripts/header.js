const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('menu');

    hamburger.addEventListener('click', (e) => {
        e.stopPropagation(); // impede o clique de propagar pro document
        menu.classList.toggle('show');
    });

    menu.addEventListener('click', (e) => {
        e.stopPropagation(); // impede que clique dentro do menu feche ele
    });

    document.addEventListener('click', () => {
        if (menu.classList.contains('show')) {
            menu.classList.remove('show');
        }
    });