jQuery(function($) {
    $(window).on('scroll', function() {
    if ($(this).scrollTop() >= 200) {
      $('.navbar').addClass('fixed-top');
    } else if ($(this).scrollTop() == 0) {
      $('.navbar').removeClass('fixed-top');
    }
  });

  function adjustNav() {
    var winWidth = $(window).width(),
      dropdown = $('.dropdown'),
      dropdownMenu = $('.dropdown-menu');

    if (winWidth >= 768) {
      dropdown.on('mouseenter', function() {
        $(this).addClass('show')
          .children(dropdownMenu).addClass('show');
      });

      dropdown.on('mouseleave', function() {
        $(this).removeClass('show')
          .children(dropdownMenu).removeClass('show');
      });
    } else {
      dropdown.off('mouseenter mouseleave');
    }
  }

  $(window).on('resize', adjustNav);

  adjustNav();
});


const dropZone = document.querySelector(".drop-zone");
const fileInput = document.querySelector("fileInput");
const progressContainer = document.querySelector("#bg-progress");

//const browseBtn = document.querySelector(".browseBtn");

function dragOver(event){
  var element = document.getElementById("dz");
  if(!element.classList.contains("dragged")){
    element.classList.add("dragged");
  }
  event.preventDefault();

}
function onLeave(event){

  var element = document.getElementById("dz");
  element.classList.remove("dragged");
  event.preventDefault();

 // console.log("drag ended");
}

//.........................................Drop......................
function Drop(event){
  var element = document.getElementById("dz");
  element.classList.remove("dragged");
  const files = event.dataTransfer.files;
  const x = document.getElementById("fileInput");
  console.log(files);
  event.preventDefault();
}

//........................................ShowModel.........................
function showModal(event) {
  document.getElementById("fileInput").click();
}


//........................................Upload File.........................

function uploadFile() {

    progressContainer.style.display = "block";

  const files = x.files[0];
  const formData = new FormData();
  formData.append(file);
  
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if(xhr.readyState ===XMLHttpRequest.DONE){
      console.log(xhr.response);
      showLink(JSON.parse(xhr.response));
    }
  };

  xhr.upload.onprogress = function (event) {
    // find the percentage of uploaded
    let percent = Math.round((100 * event.loaded) / event.total);
    progressPercent.innerText = percent;
    const scaleX = `scaleX(${percent / 100})`;
    bgProgress.style.transform = scaleX;
    progressBar.style.transform = scaleX;
  };

  xhr.upload.onprogress = update;

  xhr.open("POST",uploadURL);
  xhr.send(formData);
  
}

const showLink = ({file}) => {
  console.log(file);

}
//.........................................Validate.......................
function ValidateSize(event) {
  event.preventDefault();

  var input =
    document.getElementById('fileInput');

  var filePath = input.value;
 // const files = event.target.files;
  //console.log(files);
  // Allowing file type 
  var allowedExtensions =
    /(\.jpg|\.jpeg|\.png|\.gif)$/i;

  if (!allowedExtensions.exec(filePath))
   {
    alert('Invalid file type');
    input.value = '';
    return false;
  }else{
    window.alert("Valid File Type.");
    update();
  }
}

//..........................................Update..........................
function update() {
  var element = document.getElementById("bg-progress");
  var width = 1;
  var identity = setInterval(scene, 10);
  function scene() {
    if (width >= 100) {
      clearInterval(identity);
    } else {
      width++;
      element.style.width = width + '%';
      element.innerHTML = width * 1 + '%';
    }
  }

} 