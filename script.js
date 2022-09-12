// https://www.bermuda.com/
// https://bit.ly/3QaaD0i

// https://www.hawaii.com/
// https://bit.ly/3B7r49f

$("#card1").hide();
$("#card2").hide();

// const avatar = photoService.getRandom("random");
// console.log(avatar);

function startUp() {
    console.log("start up is firing");

    materialize();
    wireUpButtons();
}

function materialize() {
    $('.parallax').parallax();
}

function wireUpButtons() {
    $("#form").on("submit", onSubmitForm)
}

async function onSubmitForm(e) {
    e.preventDefault();
    let formInfo = readFromForm();
    formInfo.pic = await photoService.getPic(formInfo.pic).then(onGetPicSuccess).catch(onGetPicFail);
    copyClone(formInfo)
}

function readFromForm() {
    let destInfo = {};

    destInfo.destinationName = $("#destination").val();
    destInfo.location = $("#location").val();
    destInfo.pic = $("#photo").val();
    destInfo.description = $("#description").val();

    return destInfo;
}

const onGetPicSuccess = (response) => {
    const pics = response.data.results;
    const randomNum = Math.floor(Math.random() * pics.length);
    let photo = "";
    for (let i = 0; i < pics.length; i++) {
        const element = pics[randomNum];
        console.log(element);
        photo = element.urls.thumb;
    }
    console.log(photo);
    return photo;
}

function getTemplate() {
    // return $($("#card2").html()).clone();
    return _.cloneDeep($($("#card2").html()));
}

function copyClone(userInput) {
    let newClone = getTemplate(userInput);
    // changeCloneContent(newClone, userInput);
    changeCloneContent.call(userInput, newClone);
    addCloneToDom(newClone);
}

function changeCloneContent(template) {
    
    if(this.location) {
        template.find("#card-title-2").html(this.location)
    }
    if(this.description) {
        template.find("#card-desc-2").html(this.description)
    }
    if(this.pic) {
        template.find("img").attr("src", this.pic)
    }
    if(this.destinationName) {
        template.find("#webLink").attr("href", this.destinationName)
    }

    template.find("#delete").on("click", handleRemove)
    template.find("#edit").on("click", handleEdit)
}

function handleRemove(e) {
    e.preventDefault();
    const eltToRemove = e.currentTarget.closest(".card");
    while(eltToRemove.firstChild) {
        eltToRemove.removeChild(eltToRemove.firstChild);
    }
    eltToRemove.remove();
}

async function handleEdit(e) {
    e.preventDefault();
    let picCheck = false;
    let siteCheck = false;
    let locationCheck = false;

    const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
	    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
	    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
	    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
	    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
	    '(\\#[-a-z\\d_]*)?$','i');
    const newTemplate = e.currentTarget.closest('.card');

    while(picCheck === false) {
        const userPicQuery = prompt("Please input a new pic url.")
        const newPic = await photoService.getPic(userPicQuery).then(onGetPicSuccess).catch(onGetPicFail)
        if(newPic) {
            newTemplate.firstElementChild.firstElementChild.setAttribute('src', newPic);
            picCheck = true;
        }
        else {
            alert('Enter a VALID photo URL')
        }
    }
    while(siteCheck === false) {
        const newDesName = prompt("What is the new website?")
        if(!!urlPattern.test(newDesName) === true) {
            newTemplate.lastElementChild.childNodes[3].setAttribute('href', newDesName);
            siteCheck = true;
        }
        else {
            alert('Enter a VALID website URL')
        }
    }
    while(locationCheck === false) {
        const newLocation = prompt("What is the new location?")
        if(newLocation) {
            newTemplate.firstElementChild.lastElementChild.innerText = newLocation;
            locationCheck = true;
        }
        else {
            alert('Location Entry is REQUIRED')
        }
    }
    
    const newDescript = prompt("Enter new description.")
    newTemplate.childNodes[3].firstElementChild.innerText = newDescript;
}

function addCloneToDom(clone) {
    $(".yellow_border").prepend(clone);
}

const onGetPicFail = (err) => {
    console.error(err);
}