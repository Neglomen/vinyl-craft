let ImageData = {
    thumbnails: document.querySelectorAll(".img-container"),
    fullImageLink:[],
    fullImages:document.querySelectorAll('.slider-image')
};

actualImage="";

async function imageBufor(){
    ImageData.thumbnails.forEach((thumbnail,index)=>{
        const img = thumbnail.querySelector('img');
        ImageData.fullImageLink.push(img.getAttribute('src').replace('thumbnails','full'))
        thumbnail.addEventListener('click',()=>{
            loadImage(index)
        })
    })
}

function loadImage(index) {   
    if (!ImageData.fullImages[index].querySelector('img')) {
        fetch(ImageData.fullImageLink[index])
        .then(response => response.blob())
        .then(blob => {
            img = document.createElement('img')
            img.src = URL.createObjectURL(blob);
            ImageData.fullImages[index].appendChild(img)
            img.addEventListener('load', function() {
                showImage(index)
            });
    })}else{
        showImage(index)
    }
}

function closeSlider(src,imageIndex) {
    document.querySelector('.slider').style.display = "none"
    document.querySelector('body').style.overflow = "auto"

}

function showImage(index){
    ImageData.fullImages.forEach(function(el) {
        el.style.display = 'none';
      });
    document.querySelector('.slider-title').innerText = ImageData.thumbnails[index].querySelector('img').getAttribute("alt")
    ImageData.fullImages[index].style.display = 'block';
    document.querySelector('.slider').style.display = "flex"
    document.querySelector('body').style.overflow = "hidden"
    
    actualImage =  index;
}

function prevImage(){
    if(actualImage == 0){        
        loadImage(ImageData.thumbnails.length -1) 
    }else{
        loadImage(actualImage-1)
    }
}

function nextImage(){
    if(actualImage < ImageData.thumbnails.length -1){
        loadImage(actualImage+1)
    }else{
        loadImage(0) 
    }
}



window.addEventListener("DOMContentLoaded", function(){

 imageBufor();
});