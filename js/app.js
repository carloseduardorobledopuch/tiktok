document.addEventListener("DOMContentLoaded", function () {
  // Sync Meta configuration fields from main logic
  if(typeof CONFIG !== 'undefined') {
    document.title = CONFIG.storeName + " | " + CONFIG.productName;
    const storeBrand = document.getElementById("ui-store-brand");
    const productTitle = document.getElementById("ui-product-title");
    const productPrice = document.getElementById("ui-product-price");
    
    if(storeBrand) storeBrand.innerText = CONFIG.storeName;
    if(productTitle) productTitle.innerText = CONFIG.productName;
    if(productPrice) productPrice.innerText = CONFIG.productPrice;
  }

  // Pure mathematical breakdown calculation algorithm
  function calculateTotal(quantity) {
    var priceStr = typeof CONFIG !== 'undefined' ? CONFIG.productPrice : "$0.00";
    var basePrice = parseFloat(priceStr.replace(/[^0-9.]/g, '')) || 0;
    var totalCost = basePrice * parseInt(quantity);
    var suffixStr = (priceStr.match(/[A-Za-z ]+$/) || [""])[0];
    var prefixStr = (priceStr.match(/^[^0-9.]+/) || [""])[0];
    return { totalFormatted: prefixStr + totalCost.toFixed(2) + suffixStr, baseFormatted: priceStr };
  }

  // Adjust input counts layout blocks
  function updateQty(change) {
    const input = document.getElementById("ui-qty-input");
    if(!input) return;
    let current = parseInt(input.value) || 1;
    current += change;
    if (current < 1) current = 1;
    input.value = current;
  }

  const minusBtn = document.getElementById('qty-minus');
  const plusBtn = document.getElementById('qty-plus');
  if(minusBtn) minusBtn.addEventListener('click', function() { updateQty(-1); });
  if(plusBtn) plusBtn.addEventListener('click', function() { updateQty(1); });

  // Map state structure changes onto checkout container subframe
  const buyBtn = document.getElementById("open-modal-btn");
  if(buyBtn) {
    buyBtn.addEventListener("click", function() {
      const inputEl = document.getElementById("ui-qty-input");
      const currentQty = inputEl ? inputEl.value : 1;
      const billingData = calculateTotal(currentQty);
      const targetParams = new URLSearchParams({
        prod: CONFIG.productName,
        qty: currentQty,
        price: billingData.totalFormatted
      });
      const iframeEl = document.getElementById("js-checkout-iframe");
      if(iframeEl) {
        iframeEl.src = "checkout.html?" + targetParams.toString();
      }
    });
  }
});
