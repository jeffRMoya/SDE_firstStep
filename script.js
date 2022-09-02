// https://www.bermuda.com/
// https://bit.ly/3QaaD0i

// https://www.hawaii.com/
// https://bit.ly/3B7r49f

$("#card1").hide();
$("#card2").hide();

$("document").ready(function(){
    $('.parallax').parallax();
  });

function startUp() {
    console.log("start up is firing");

    wireUpButtons();
}

function wireUpButtons() {
    $("#add_to_list_btn").on("click", onSubmitForm)
}

function onSubmitForm() {
    let formInfo = readFromForm();
    copyClone(formInfo);
}

function readFromForm() {
    let destInfo = {};

    destInfo.destinationName = $("#destination").val();
    destInfo.location = $("#location").val();
    destInfo.pic = $("#photo").val();
    destInfo.descript = $("#description").val();

    return destInfo;
}

function getTemplate() {
    return $($("#card2").html()).clone();
}

function copyClone(userInput) {
    let newClone = getTemplate();
    changeCloneContent(newClone, userInput);
    addCloneToDom(newClone);
}

function changeCloneContent(template, info) {
    template.find("a").attr("href", info.destinationName)
    template.find("#card-title-2").html(info.location)
    template.find("img").attr("src", info.pic)
    template.find("#card-desc-2").html(info.descript)
}

function addCloneToDom(clone) {
    $(".yellow_border").append(clone);
}