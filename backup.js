  let cleverTapData = {};
    cleverTapData[`Order ID ${ABFRL}`] = orderData.order.id_order;
    cleverTapData[`Payment Type ${ABFRL}`] = orderData.order.payment;
    cleverTapData[`COD ${ABFRL}`] = false;
    cleverTapData[`Address ${ABFRL}`] = getformattedAddress(orderData.address);
    cleverTapData[`Order Number ${ABFRL}`] = orderData.order.order_num;

    cleverTapData[`Pin Code ${ABFRL}`] = orderData.address.postcode || "";
    cleverTapData[`City ${ABFRL}`] = orderData.address.city || "";
    cleverTapData[`State ${ABFRL}`] = orderData.address.state || "";
    cleverTapData[`Coupon Code ${ABFRL}`] = orderData?.order?.discounts?.coupons?.filter(item => item?.coupon_code)?.map(item => item?.coupon_code +  " : "  + item?.id_product_attribute + " : " + item.value_tax_incl)?.join() || "";
    cleverTapData[`Loyalty Points ${ABFRL}`] = orderData?.order?.discounts?.loyalty?.filter((item) => item.value_tax_incl)?.map((item) => item?.offer_name + " : "  + item.id_product_attribute + " : " + item.value_tax_incl).join() || "";
    cleverTapData[`Voucher Code ${ABFRL}`] = orderData?.order?.discounts?.egv?.find(item=> item)?.coupon_code || "";
    cleverTapData[`Voucher Code Value ${ABFRL}`] = orderData?.order?.discounts?.egv?.find(item=> item)?.value_tax_incl || "";
    cleverTapData[`Voucher Code Expiry ${ABFRL}`] = "";
    cleverTapData[`Status ${ABFRL}`] = "Order Placed";
    cleverTapData[`Credits ${ABFRL}`] = orderData?.order?.discounts?.credits?.filter((item) => item.value_tax_incl)?.map((item) => item?.offer_name + " : "  + item?.id_product_attribute + " : " + item.value_tax_incl).join() || "";
    const ctProductData = getClevertapOrderProduct(orderData.productDetails, props.configData)
    cleverTapData = {...cleverTapData, ...ctProductData}
    window.clevertap.event.push("Charged", cleverTapData);
  }
