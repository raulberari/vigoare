function changeColour() 
{
	var nightModeButton = document.getElementsByClassName("nightModeButton");
    var paragraphs = document.getElementsByTagName('p');
    var links = document.getElementsByTagName('A');

	if (document.body.style.background != "rgb(15, 15, 15)")
    {
    	document.body.style.background = "#0f0f0f";
        nightModeButton[0].style.borderColor = "#fafafa";
        nightModeButton[0].style.background = "#0f0f0f"; 
        nightModeButton[0].id = "blackBG";
        localStorage.setItem("BGColor", "#0f0f0f");

        for (var i = 0; i < links.length; i++)
        {
            links[i].style.color = "#fafafa";  

        }  
        for (var i = 0; i < paragraphs.length; i++)
        {
            paragraphs[i].style.color = "#fafafa";  

        }  


    }
    else
    {
    	document.body.style.background = "#fafafa";
        nightModeButton[0].style.borderColor = "#0f0f0f";
        nightModeButton[0].style.background = "#fafafa"; 
        nightModeButton[0].id = "whiteBG";
        localStorage.setItem("BGColor", "#fafafa");

        for (var i = 0; i < links.length; i++)
        {
            links[i].style.color = "#0f0f0f";  

        }  
        for (var i = 0; i < paragraphs.length; i++)
        {
            paragraphs[i].style.color = "#0f0f0f";  

        }  
    }
}

function storage()
{
    var nightModeButton = document.getElementsByClassName("nightModeButton");
    var paragraphs = document.getElementsByTagName('P');
    var links = document.getElementsByTagName('A');

    if (localStorage.getItem("BGColor") === "#0f0f0f")
    {
        document.body.style.background = "#0f0f0f";
        nightModeButton[0].style.borderColor = "#fafafa";
        nightModeButton[0].style.background = "#0f0f0f"; 
        nightModeButton[0].id = "blackBG";
        localStorage.setItem("BGColor", "#0f0f0f");

        for (var i = 0; i < links.length; i++)
        {
            links[i].style.color = "#fafafa";  

        }  
        for (var i = 0; i < paragraphs.length; i++)
        {
            paragraphs[i].style.color = "#fafafa";  

        }  

    }
    else
    {
        document.body.style.background = "#fafafa";
        nightModeButton[0].style.borderColor = "#0f0f0f";
        nightModeButton[0].style.background = "#fafafa"; 
        nightModeButton[0].id = "whiteBG";
        localStorage.setItem("BGColor", "#fafafa");

        for (var i = 0; i < links.length; i++)
        {
            links[i].style.color = "#0f0f0f";  

        }  
        for (var i = 0; i < paragraphs.length; i++)
        {
            paragraphs[i].style.color = "#0f0f0f";  

        }  

    }

}

function buttonFloatOnTop()
{
    var buttonContainer = document.getElementById("buttonsContainer");
    var heightThreshold = (window.innerHeight) / 3;

    if (document.body.scrollTop > heightThreshold || document.documentElement.scrollTop > heightThreshold)
    {
        buttonContainer.style.position = "fixed";
        buttonContainer.style.top = "2%";
    }
    else
    {
        buttonContainer.style.position = "absolute";
        buttonContainer.style.top = "";
    }
}

function onLoad()
{
    storage();
}

window.onscroll = function () {buttonFloatOnTop()};

