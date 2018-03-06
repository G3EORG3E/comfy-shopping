<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="icon" href="/favicon.ico">
    <title>Comfy shoping</title>
    <link rel="stylesheet" href="/css/app.css">
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
            $json_prods = file_get_contents('data/product-list.json');
            $prodArray = json_decode($json_prods);
        ?>

        <div class="products-holder">
            <?php foreach ($prodArray as $produkt): ?>
                <div class="product">
                    <div class="name"><?= htmlspecialchars($produkt->name) ?></div>
                    <a href="#" class="add-product-to-cart">pridaj</a>
                </div>        
            <?php endforeach; ?>
        </div>
    </div>
    <shopping-cart></shopping-cart>
    <flash-message message=""></flash-message>

</div>


    <script src="/js/app.js"></script>
    <script defer src="https://use.fontawesome.com/releases/v5.0.6/js/all.js"></script>
</body>
</html>