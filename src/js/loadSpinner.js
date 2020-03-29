export default function loadSpinner(){

	const loading = document.querySelector('.loading');

	document.addEventListener('loadingfinished', () => {
		loading.classList.add('loading--fade-out');
		setTimeout( () => {
			loading.classList.remove('loading--fade-out');
			loading.style.display = 'none';
		}, 500);
	});
	
}