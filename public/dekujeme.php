<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="icon" href="/favicon.ico">
    <title>Comfy shoping</title>
    <link rel="stylesheet" href="/css/app.css">
    <script>
        window.i18n = window.i18n || {}; 
        var i18npart = {
            "cart":"Košík",
            "personal-info":"Osobní údaje",
            "choose-delivery":"Vybrat dopravu",
            "delivery":"Doprava",
            "choose-payment":"Vybrat platbu",
            "payment":"Platba",
            "finish-cart":"Dokončit objednávku",
            "summary":"Shrnutí",
            "confirm":"Potvrdit"
        }; 
        for (var w in i18npart) { window.i18n[w] = i18npart[w]; };
    </script>

</head>
<body>
<div id="root">
    <div id="page-grid">
        <div id="main-header">
            <div id="page-logo">Comfy<span>Shoppin'</span></div>
            <cart-status></cart-status>            
        </div>

        <div id="page-cover">
            <div class="back-cover">DĚKUJEME</div>
            <h1>dekujeme za Váš nákup <span>version 1.0</span></h1>
        </div>    

    </div>
    <shopping-cart></shopping-cart>    
    <flash-message message=""></flash-message>
</div>


    <script src="/js/app.js"></script>
    <script defer src="https://use.fontawesome.com/releases/v5.0.6/js/all.js"></script>
</body>
</html> 