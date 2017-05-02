function schimbaCuloarea () 
{
	var butonul = document.getElementsByClassName("nightModeButton");
    var paragraphs = document.getElementsByTagName('P');
    var links = document.getElementsByTagName('A');

	if (document.body.style.background != "rgb(15, 15, 15)")
    {
    	document.body.style.background = "#0f0f0f";
        butonul[0].style.borderColor = "#fafafa";
        butonul[0].style.background = "#0f0f0f"; 
        butonul[0].id = "blackBG";
        localStorage.setItem("BGColor", "#0f0f0f");

        for (var i = 0; i < links.length; i++)
        {
            links[i].style.color = "#fafafa";  

        }  
        for (var i = 0; i < paragrahps.length; i++)
        {
            paragraphs[i].style.color = "#fafafa";  

        }  
    }
    else
    {
    	document.body.style.background = "#fafafa";
        butonul[0].style.borderColor = "#0f0f0f";
        butonul[0].style.background = "#fafafa"; 
        butonul[0].id = "whiteBG";
        localStorage.setItem("BGColor", "#fafafa");

        for (var i = 0; i < links.length; i++)
        {
            links[i].style.color = "#0f0f0f";  

        }  
        for (var i = 0; i < paragrahps.length; i++)
        {
            paragraphs[i].style.color = "#0f0f0f";  

        }  
    }
}

function storage()
{
    var butonul = document.getElementsByClassName("nightModeButton");
    var paragraphs = document.getElementsByTagName('P');
    var links = document.getElementsByTagName('A');

    if (localStorage.getItem("BGColor") === "#0f0f0f")
    {
        document.body.style.background = "#0f0f0f";
        butonul[0].style.borderColor = "#fafafa";
        butonul[0].style.background = "#0f0f0f"; 
        butonul[0].id = "blackBG";
        localStorage.setItem("BGColor", "#0f0f0f");

        for (var i = 0; i < links.length; i++)
        {
            links[i].style.color = "#fafafa";  

        }  
        for (var i = 0; i < paragrahps.length; i++)
        {
            paragraphs[i].style.color = "#fafafa";  

        }  

    }
    else
    {
        document.body.style.background = "#fafafa";
        butonul[0].style.borderColor = "#0f0f0f";
        butonul[0].style.background = "#fafafa"; 
        butonul[0].id = "whiteBG";
        localStorage.setItem("BGColor", "#fafafa");

        for (var i = 0; i < links.length; i++)
        {
            links[i].style.color = "#0f0f0f";  

        }  
        for (var i = 0; i < paragrahps.length; i++)
        {
            paragraphs[i].style.color = "#0f0f0f";  

        }  

    }
}