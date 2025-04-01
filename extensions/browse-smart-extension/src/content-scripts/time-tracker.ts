const warningBanner = document.createElement('div');
warningBanner.innerText = 'Daily time limit exceeded for this website!';

warningBanner.style.position = 'fixed';
warningBanner.style.top = '0';
warningBanner.style.left = '0';
warningBanner.style.width = '100%';
warningBanner.style.backgroundColor = 'red';
warningBanner.style.color = 'white';
warningBanner.style.fontSize = '20px';
warningBanner.style.textAlign = 'center';
warningBanner.style.padding = '10px';
warningBanner.style.zIndex = '10000';

document.body.prepend(warningBanner);
