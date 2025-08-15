function trocarDiaComAnimacao(novoDia) {
    const workoutCard = document.getElementById('workoutCard');
    const exercisesList = document.getElementById('exercisesList');

    // Remove classes anteriores
    workoutCard.classList.remove('fade-in', 'fade-out');
    exercisesList.classList.remove('fade-in', 'fade-out');

    // Adiciona fade-out
    workoutCard.classList.add('fade-out');
    exercisesList.classList.add('fade-out');

    // Aguarda animação de saída
    setTimeout(() => {
        // Atualiza o treino normalmente (aqui entra sua função atual)
        renderWorkout(novoDia);

        // Aplica fade-in
        workoutCard.classList.remove('fade-out');
        exercisesList.classList.remove('fade-out');
        workoutCard.classList.add('fade-in');
        exercisesList.classList.add('fade-in');
    }, 300); // tempo igual ao fade-out
}
