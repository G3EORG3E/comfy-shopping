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
            <div class="back-cover">CLEVERO</div>
            <h1>Comfortable shopping <span>version 1.0</span></h1>
        </div>    

        <?php 
            $json_prods = file_get_contents('http://cartapi.nettrender.com/api/products/get');
            $prodArray = json_decode($json_prods);
        ?>

        <div class="products-holder">
            <?php foreach ($prodArray as $produkt): ?>
                <div class="product">
                    <div class="thumbnail">
                        <img src="<?= htmlspecialchars($produkt->image) ?>" alt="<?= htmlspecialchars($produkt->productName) ?>">
                    </div>
                    <div class="info">
                        <h2 class="name"><?= htmlspecialchars($produkt->productName) ?></h2>
                        <p class="summary"><?= htmlspecialchars($produkt->descriptionSummary) ?></p>
                        <div class="price"><?= htmlspecialchars($produkt->priceVAT) ?></div>
                        <div class="btns">
                            <a href="#" class="btn">Detail</a>
                            <a href="#"  class="btn ghost quick-shop" data-product-id="<?= htmlspecialchars($produkt->productId) ?>">Rychlý nákup</a>
                        </div>
                    </div>
                </div>        
            <?php endforeach; ?>
        </div>
    </div>
    <product-detail></product-detail>
    <shopping-cart></shopping-cart>    
    <flash-message message=""></flash-message>
</div>


    <script src="/js/app.js"></script>
    <script defer src="https://use.fontawesome.com/releases/v5.0.6/js/all.js"></script>
</body>
</html>