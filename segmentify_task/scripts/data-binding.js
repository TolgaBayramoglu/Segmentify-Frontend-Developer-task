$(document).ready(function () {
  let productsList;
  let productKeyList;

  // product-list.json dosyasından veri çekiliyor ve ayrıştırılıyor

  $.getJSON("./data/product-list.json", function (data) {
    let products = data.responses[0][0].params.recommendedProducts;
    setProducts(products);
    let productsKeys = Object.keys(products);
    setTabs(productsKeys);
    listProducts(0);
  }).fail(function () {//veri okunmazsa konsola yaz
    console.log("Dosya Okunamadı!");
  });

  // product-list.json dosyasından alınan kategoriler HTML olarak kategori bölümüne ekleniyor

  function setTabs(keys) {
    productKeyList = keys;
    var tabs =
      '<li class="nav-item"> <a class="nav-link active" data-indices="0">' +
      keys[0] +
      "</a> </li>";
    for (var i = 1; i < 6; i++) {
      let key = keys[i].split(">"); // > işaretini görünce ye kadar kategori adı yap
      key[1].length > 20
        ? (key[1] = key[1].substr(1, 20) + "...")
        : (key[1] = key[1].substr(1, key[1].length));
      tabs =
        tabs +
        '<li class="nav-item"> <a class="nav-link" data-indices="' +
        i +
        '">' +
        key[1] +
        "</a> </li>";
    }
    $(".category-nav").html(tabs);
  }

  // product-list.json dosyasındaki ürünler global olarak tanımlanıyor

  function setProducts(products) {
    productsList = products;
  }

  // kategoriye tıklandığında gelen indis ile ürünler liste olarak oluşturuluyor ve swiper slide'ına tek tek ekleniyor

  function listProducts(indices) {
    clearSwiper();
    var products = productsList[productKeyList[indices]];
    products.map(function (product) {
      let shipping =
        product.params.shippingFee == "FREE" //free yi shippingfee yap
          ? '<i class="fas fa-truck"></i> <span>Ücretsiz Kargo</span>'
          : '<div class="my-5"></div>';
      var listProducts =
        '<div class="swiper-slide">' +
        '<div class="card product-card ">' +
        '<div class="image-area mb-2">' +
        '<img data-src="' +
        product.image +
        '" class="card-img-top swiper-lazy" src="https://i.pinimg.com/originals/a9/0e/73/a90e737d05ebfa82bf96168def807c36.gif" >' + //lazy görseli
        "</div>" +
        '<div class="card-body pt-0">' +
        '<h5 class="card-title">' +
        product.name +
        "</h5>" +
        '<div class="bottom-body">' +
        '<section class="price px-3 py-2">  <span>  ' +
        product.priceText +
        " </span>  </section>" +
        '<section class="shipping px-2 py-0 mb-2">  ' +
        shipping +
        "  </section>" +
        '<section> <button type="button" class="btn btn-primary w-100 add-cart">Sepete Ekle</button> </section>' +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>";

      swiper.appendSlide(listProducts);
      swiper.updateSlidesProgress();
      swiper.lazy.load();
    });
  }

  // Yeni kategori seçildiğinde önceki kategoriden kalan slidelar temizleniyor

  function clearSwiper() {
    if ($(".swiper-slide").length > 0) {
      swiper.removeSlide($(".swiper-slide").length - 1);
      clearSwiper();
    }
  }

  // tıklama olaylarının fonksiyonları tanımlanıyor

  $(document.body).on("click", ".nav-link", function () {//navigation bölümünde tıklanınca
    $(".category-nav .active").removeClass("active"); //aktif class'dan silinir
    $(this).addClass("active"); //tıklanana aktif verilir
    var indices = $(this).attr("data-indices"); //listelenen veri tıklananın verisi olur
    listProducts(indices); //veri listelenir
  });

  $(document.body).on("click", ".add-cart", function () { //sepete ekleye tıklanınca
    $("#toast").toast("show"); //toast gösterilir
  });
});
