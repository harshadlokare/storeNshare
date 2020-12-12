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
const fileInput = document.querySelector("#fileInput");
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
function Drop(event){
  var element = document.getElementById("dz");
  element.classList.remove("dragged");

  const files = event.dataTransfer.files;
  const x = document.getElementById("fileInput");

  console.log(files);

  event.preventDefault();
}

function uploadFile(){
  const files = x.files[0];
  const formData = new FormData();
  formData.append(file);

  const xhr = new XMLHttpRequest();
  
}
function showModal() {
  document.getElementById('fileInput').click();
}

/*
browseBtn.addEventListener("click", () => {
  fileInput.click();
});
*/
/*
dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  //   console.log("dropped", e.dataTransfer.files[0].name);
  const files = e.dataTransfer.files;
  if (files.length === 1) {
    if (files[0].size < maxAllowedSize) {
      fileInput.files = files;
      uploadFile();
    } else {
      showToast("Max file size is 100MB");
    }
  } else if (files.length > 1) {
    showToast("You can't upload multiple files");
  }
  dropZone.classList.remove("dragged");
});
*/

/*
dropZone.addEventListener("dragleave", (e) => {
  dropZone.classList.remove("dragged");

  console.log("drag ended");
});

// file input change and uploader
fileInput.addEventListener("change", () => {
  if (fileInput.files[0].size > maxAllowedSize) {
    showToast("Max file size is 100MB");
    fileInput.value = ""; // reset the input
    return;
  }
  uploadFile();
});
*/