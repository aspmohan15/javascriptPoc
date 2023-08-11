const handleChange = (e, facet, value, colorName) => {

        
    const temp = { ...appliedFilters };
    if (e.target.checked) {
        if (temp[facet]) {
            temp[facet].push(value);
            if(colorName){
                temp["colorName"].push(colorName)
            }
        } else {
            temp[facet] = [value];
            if(colorName){
                temp["colorName"] = [colorName]
            }
        }
    } else {
        if (temp[facet]?.length === 1) {
            delete temp[facet];
            if(colorName){
                delete temp["colorName"]
            }
        }
        else {
            if (facet.toLowerCase() == "price") {
                delete temp[facet];
            }
            else {
                let tempIndex = temp[facet].indexOf(value);
                temp[facet].splice(tempIndex, 1);
                if(colorName){
                 temp["colorName"].splice(tempIndex, 1);
                }

            }
        }
    }
    filterData.page = 1     
    const tempFilters= {
        appliedFilters: {
            ...temp
        },
        filterData: filterData
    }  
    handleCleverTapAppliedFilters(props.theme, temp, props.plpFilters?.displayFilters);
    handleAdobe(tempFilters, value);
    props.setProductFilters(tempFilters);   
};


const handleChange = (e, facet, value, colorName) => {

    const temp = { ...appliedFilters };
    if (e.target.checked) {
        if (temp[facet]) {
            temp[facet].push(value);
            if(colorName){
                temp["colorName"].push(colorName)
            }
        } else {
            temp[facet] = [value];
            if(colorName){
                temp["colorName"] = [colorName]
            }
        }
    } else {
        if (temp[facet]?.length === 1) {
            delete temp[facet];
            if(colorName){
                delete temp["colorName"]
            }
        }
        else {
            if (facet.toLowerCase() == "price") {
                delete temp[facet];
            }
            else {
                let tempIndex = temp[facet].indexOf(value);
                temp[facet].splice(tempIndex, 1);
                if(colorName){
                 temp["colorName"].splice(tempIndex, 1);
                }

            }
        }
    }
    filterData.page = 1     
    const tempFilters= {
        appliedFilters: {
            ...temp
        },
        filterData: filterData
    }  
    handleCleverTapAppliedFilters(props.theme, temp, props.plpFilters?.displayFilters);
    handleAdobe(tempFilters, value);
    props.setProductFilters(tempFilters);   
};

export const handleCleverTapAppliedFilters = (theme, appliedFilters, displayFilters) => {
    if (window.clevertap) {
      const cleverTapData = {};
      console.log(appliedFilters,"appliedFiltersKEY");
  
      Object.keys(displayFilters)?.forEach(key => {
        if (appliedFilters[key]) {
          if(key === "Color"){
            cleverTapData[`${key} ${theme}`] = appliedFilters["colorName"]?.join(", ");
          } else {
            cleverTapData[`${key} ${theme}`] = appliedFilters[key]?.join(", ");
          }
        }
      })
      console.log(cleverTapData,"cleverTapDatacleverTapData");
      cleverTapData[`Source ${theme}`] = getCleverTapSource();
      window.clevertap.event.push("Filters", cleverTapData);
    }
  }

// Mobile UPI method
const forMobileUPIPayment =() {
const handleClickUPIMobile = async (type) => {
    // this is calling when click on UPI intent icon
    if (type) {
        dispatch({ type: SHOW_LOADER, payload: true });
        const orderInitRes = await paytmOrder("UPI_INTENT")
        if (orderInitRes && orderInitRes.success && orderInitRes.results?.length > 0) {
            const data = {
                orderId: parseInt(orderInitRes.results[0].orderId),
                transactionToken: orderInitRes.results[0].txnToken,
                requestType: "NATIVE",
                paymentMode: "UPI_INTENT",
                brand: "trendin",
                finalPayment: true,
                buyNow: isBuyNow ? 1 : 0,
                authMode: "USRPWD"
            }
        
            const pmtProcessReponse = await paymentProcessAPI(data, props.configData)
            pmtProcessReponse = {
                "success": true,
                "results": {
                    "body": {
                        "resultInfo": {
                            "resultStatus": "S",
                            "resultCode": "0000",
                            "resultMsg": "Success",
                            "retry": false
                        },
                        "callBackUrl": "https://test.api.sa.checkout.abfrl.in/webhook/payTMCallback",
                        "deepLinkInfo": {
                            "deepLink": "upi://pay?pa=abfrlp002@paytm&pn=TestMerchant&mc=7221&tid=PYTM3080913368036300801&tr=3080913368036300801&am=2499&cu=INR",
                            "orderId": "SA787677876"
                        }
                    },
                    "transactionToken": "a72d499f-0449-46d8-a863-a7f0b75cf5d4",
                    "orderId": "787677876",
                    "pspLinks": {
                        "phonepe": "phonepe://pay?pa=abfrlp002@paytm&pn=TestMerchant&mc=7221&tid=PYTM3080913368036300801&tr=3080913368036300801&am=2499&cu=INR",
                        "gpay": "tez://upi/pay?pa=abfrlp002@paytm&pn=TestMerchant&mc=7221&tid=PYTM3080913368036300801&tr=3080913368036300801&am=2499&cu=INR",
                        "paytm": "paytmmp://pay?pa=abfrlp002@paytm&pn=TestMerchant&mc=7221&tid=PYTM3080913368036300801&tr=3080913368036300801&am=2499&cu=INR"
                    }
                },
                "msg": [
                    "SUCCESS"
                ],
                "cache": 0,
                "ttl": 0,
                "hash": "6a6424bfd31d1e11255eb0ed0be53938.0272cc6442cde26af1de93328fe8370d.35fa5ce052b6b1546674ed25eb1362e9"
            }
            if (pmtProcessReponse && pmtProcessReponse.success && pmtProcessReponse.results && pmtProcessReponse.results.body && pmtProcessReponse.results.body.deepLinkInfo) {
                removeSession(storedOrderId + PAYTM_WALLETINFO);
                removeSession(storedOrderId + PAYTM_WALLET_INIT_RES);
                openAppUPISection(pmtProcessReponse.results.body.deepLinkInfo?.deepLink, type, orderInitRes.results[0].orderId)
            } else {
                showToasterMessage(pmtProcessReponse?.msg)
                dispatch({ type: SHOW_LOADER, payload: false });
                handleInitProcessApiError(pmtProcessReponse);
            }
        } else {
            dispatch({ type: SHOW_LOADER, payload: false });
            showToasterMessage(orderInitRes.msg)
        }
    }
}
const paytmOrder = async (role, finalPayment = true) => {
    const orderInitResData = getSession(storedOrderId + PAYTM_WALLET_INIT_RES);
    // 
    // first payment initiate api call
    let visitorId = 0;
    const errorCode = [INVALID_CART_SESSION, INVALID_CUSTOMER_SESSION, INVALID_SESSION];
    const rr_rcs = getCookies('al_rcs') ?? '';
    const regionCode = getCookies(CURRENT_REGION_CODE, 'UL');
    if (typeof alloy !== "undefined") {
        await alloy("getIdentity")
            .then(function (result) {
                // The command succeeded.
                console.log("ECID:", result.identity.ECID);
                visitorId = result.identity.ECID;
            })
    }
    const data = {
        brand: "trendin",
        addressId: props.selectedAddressId,
        module: "paytm",
        role: role,
        finalPayment: finalPayment,
        buyNow: isBuyNow ? 1 : 0,
        cloudvisitorId: visitorId,
        userAgent: navigator?.userAgent,
        rcs: rr_rcs,
        rid: regionCode
    }
    if(role === 'Wallet' && finalPayment) {
        data.orderId = storedOrderId
    }
    const orderResponse = await getPayTMOrderAPI(data, props.configData);
    console.log(orderResponse,"orderResponse");
    if (orderResponse && orderResponse.success) {
        const clevertapData = {};
        clevertapData[`Source ${ABFRL}`] = getCleverTapSource();
        clevertapData[`PaymentMode ${ABFRL}`] = expanded;
        clevertapData[`OrderNumber ${ABFRL}`] = orderResponse.results[0].orderId;
        clevertapData[`Status ${ABFRL}`] = "Payment Initiated";
        clevertapData[`Date ${ABFRL}`] = new Date().getTime();
        clevertapData[`Time ${ABFRL}`] = new Date().getTime();
        window.clevertap.event.push("Payment Initiated", clevertapData)
    } else {
        const message = orderResponse.msg;
        showToasterMessage(message);
        if (errorCode.includes(getMessageCode(message))) {
            window.location.href = `${configInfo?.CheckoutPageUrl}${CART_PATH}&errorMessage=${INTERNAL_SERVER_ERROR}`
        }
        return orderResponse
    }
    if (orderResponse && Object.keys(orderResponse).length > 0 && orderResponse.success) {
        const orderData = {
            orderId: parseInt(orderResponse.results[0].orderId),
            amount: orderResponse.results[0].amount,
            brand: "trendin"
        }
        if((role === 'Wallet' && finalPayment) || orderInitResData) {
            orderData.finalPayment = finalPayment,
            orderData.transactionToken = orderInitResData?.txnToken
        }
        setStorage("orderId", orderResponse.results[0].orderId)
        const orderInitRes = await getPayTMInitiateAPI(orderData, props.configData);
        // debugger
        if (orderInitRes && !orderInitRes.success) {
            const messageInit = orderInitRes?.results?.[0]?.body?.resultInfo?.resultMsg ? orderInitRes.results?.[0]?.body.resultInfo.resultMsg : orderInitRes.msg;
            showToasterMessage(messageInit);
            if (errorCode.includes(getMessageCode(messageInit))) {
                window.location.href = `${configInfo?.CheckoutPageUrl}${CART_PATH}&errorMessage=${INTERNAL_SERVER_ERROR}`
            }
            if (orderInitRes?.results?.[0]?.body?.resultInfo?.resultCode === '324') {
                removeStorage(CART_ID)
                window.location.href = `${configInfo?.CheckoutPageUrl}${CART_PATH}&errorMessage=${INTERNAL_SERVER_ERROR}`
            }
            handleInitProcessApiError(orderInitRes, 'array');
        }
        if (orderInitRes && orderInitRes.success) {
            orderInitRes.results[0].mid = orderResponse.results[0].mid;
            orderInitRes.results[0].prefixOrderId = orderResponse.results[0].prefixOrderId;
            orderInitRes.results[0].paytmurl = orderResponse.results[0].paytmurl;
        }
        return orderInitRes
    }
}


export const getPayTMOrderAPI = async (data, configData, type) => {
    return postData(GET_PAYTM_ORDER, configData, data, "", type).then(response => {
        if (response) {
            return {
                "success": true,
                "results": [
                    {
                        "orderId": 787677876,
                        "amount": "2499.00",
                        "mid": "216820000004314377473",
                        "paytmurl": "https://stage-router.paytm.in",
                        "prefixOrderId": "SA787677876"
                    }
                ],
                "msg": [
                    "ORDER_SUCCESS"
                ],
                "cache": 0,
                "ttl": 0,
                "hash": "6a6424bfd31d1e11255eb0ed0be53938.0272cc6442cde26af1de93328fe8370d.842f869fb99e4b25c6d26e61b0528b49"
            }
        }
    });
}


export const getPayTMInitiateAPI = async (data, configData, type) => {
    return postData(START_PAYTM_ORDER_INITIATE, configData, data, "", type).then(response => {
        if (response) {
            return {
                "success": true,
                "results": [
                    {
                        "orderId": "787677876",
                        "txnToken": "a72d499f-0449-46d8-a863-a7f0b75cf5d4",
                        "originalOrderAmount": "2499.00"
                    }
                ],
                "msg": [
                    "SUCCESS"
                ],
                "cache": 0,
                "ttl": 0,
                "hash": "6a6424bfd31d1e11255eb0ed0be53938.0272cc6442cde26af1de93328fe8370d.c05369a8bd54d5bc929b4a92e6a0a5de"
            }
        }
    });
}

const handleInitProcessApiError = (resData, resultType = 'obj') => {
    let errorMessage; let resultCode;
    if (resultType === 'array') {
        errorMessage = resData?.results?.[0]?.body?.resultInfo?.resultMsg;
        resultCode = resData?.results?.[0]?.body?.resultInfo && resData?.results?.body?.resultInfo?.resultCode;
    }
    else {
        errorMessage = resData?.results?.body?.resultInfo?.resultMsg;
        resultCode = resData?.results?.body?.resultInfo && resData?.results?.body?.resultInfo?.resultCode;
    }
    if (resultCode === "1006") {
        removeSession(storedOrderId + PAYTM_WALLETINFO);
        removeSession(storedOrderId + PAYTM_WALLET_INIT_RES);
        window.location.href = `${configInfo?.CheckoutPageUrl}${CART_PATH}&errorMessage=${errorMessage}`
    }
}

export const paymentProcessAPI = async (data, configData) => {
    return postData(PAYMENT_PROCESS, configData, data).then(response => {
        if (response) {
            return {
                "success": true,
                "results": {
                    "body": {
                        "resultInfo": {
                            "resultStatus": "S",
                            "resultCode": "0000",
                            "resultMsg": "Success",
                            "retry": false
                        },
                        "callBackUrl": "https://test.api.sa.checkout.abfrl.in/webhook/payTMCallback",
                        "deepLinkInfo": {
                            "deepLink": "upi://pay?pa=abfrlp002@paytm&pn=TestMerchant&mc=7221&tid=PYTM3080913368036300801&tr=3080913368036300801&am=2499&cu=INR",
                            "orderId": "SA787677876"
                        }
                    },
                    "transactionToken": "a72d499f-0449-46d8-a863-a7f0b75cf5d4",
                    "orderId": "787677876",
                    "pspLinks": {
                        "phonepe": "phonepe://pay?pa=abfrlp002@paytm&pn=TestMerchant&mc=7221&tid=PYTM3080913368036300801&tr=3080913368036300801&am=2499&cu=INR",
                        "gpay": "tez://upi/pay?pa=abfrlp002@paytm&pn=TestMerchant&mc=7221&tid=PYTM3080913368036300801&tr=3080913368036300801&am=2499&cu=INR",
                        "paytm": "paytmmp://pay?pa=abfrlp002@paytm&pn=TestMerchant&mc=7221&tid=PYTM3080913368036300801&tr=3080913368036300801&am=2499&cu=INR"
                    }
                },
                "msg": [
                    "SUCCESS"
                ],
                "cache": 0,
                "ttl": 0,
                "hash": "6a6424bfd31d1e11255eb0ed0be53938.0272cc6442cde26af1de93328fe8370d.35fa5ce052b6b1546674ed25eb1362e9"
            }
        }
    });
}

const openAppUPISection = (deeplink, type, orderId) => {
    // by this redirecting on UPI intent app
    let appUrl = "";
    let iosLink = "";
    let androidLink = "";
    switch (type) {
        case 1:
            iosLink = "https://apps.apple.com/pg/app/phonepe-recharge-investment/id1170055821";
            androidLink = "https://play.google.com/store/apps/details?id=com.phonepe.app";
            appUrl = deeplink.replace("upi://", "")
            appUrl = `phonepe://${appUrl}`;
            break;
        case 2:
            iosLink = "https://apps.apple.com/ph/app/paytm-upi-payments-recharge/id473941634";
            androidLink = "https://play.google.com/store/apps/details?id=net.one97.paytm";
            appUrl = deeplink.replace("upi://", "")
            appUrl = `paytmmp://${appUrl}`;
            break;
        case 3:
            iosLink = "https://itunes.apple.com/in/app/google-pay-for-india-tez/id1193357041?mt=8";
            androidLink = "https://play.google.com/store/apps/details?id=com.google.android.apps.nbu.paisa.user&hl=en_IN";
            appUrl = deeplink.replace("upi://", "")
            appUrl = `tez://upi/${appUrl}`;
            break;
    }
    let isLoaded = false;
    if (appUrl) {
        const isWindowInActive = async () => {
            window.removeEventListener('blur', isWindowInActive);
            isLoaded = true;
            dispatch({ type: LOADING_MESSAGE, payload: "Please wait, Payment in process" });
            //using this we are calling payment status api after every 10 sec till 2 min
            let tempInterval = setInterval(() => {
                checkPaymentStatusAPI(false, orderId)
            }, 10000);
            setTimeout(async () => {
                clearInterval(tempInterval)
                checkPaymentStatusAPI("callApi", orderId)
            }, 120000)
        };
        const openInstaller = () => {
            // this will redirect to app store or play store
            if (!isLoaded) {
                window.removeEventListener('blur', isWindowInActive);
                if (isAndroid()) {
                    window.location.href = androidLink;
                } else {
                    var link = document.createElement("a");
                    link.id = 'upiintentId';
                    link.href = iosLink;
                    document.body.appendChild(link);
                    document.getElementById('upiintentId').click();
                    // window.location.href = iosLink;
                    document.body.removeChild(link);

                }
            }
        }
        setTimeout(() => {
            openInstaller()
        }, 6000);
        window.removeEventListener('blur', isWindowInActive);
        window.addEventListener('blur', isWindowInActive);
        window.location.href = appUrl;
    }
}


const checkPaymentStatusAPI = async (tempCheck, orderId = "") => {
    // in this calling pyment status api 
    const data = {
        orderId: orderId ? parseInt(orderId) : scanAndPayPaytm?.data?.withoutOrder,
        brand: "trendin"
    }
    const paytmStatus = await paymentStatusAPI(data, props.configData);
    if (paytmStatus && paytmStatus.success && paytmStatus.results && paytmStatus.results.body) {
        dispatch({ type: LOADING_MESSAGE, payload: "" });
        await paytmCallbackAPI(paytmStatus.results.body)
        setScanAndPayPaytmcallStatusApi(false)
        setScanAndPayPaytm(false)
    }
    else {
        if (tempCheck == "callApi") {
            dispatch({ type: LOADING_MESSAGE, payload: "" });
            await paytmCallbackAPI(paytmStatus.results.body)
        }
    }
}

export const paymentStatusAPI = async (data, configData) => {
    return postData(PAYMENT_STATUS, configData, data).then(response => {
        if (response) {
            return response
        }
    });
}


const paytmCallbackAPI = async (paytmStatus) => {
    // this function calls only for QR code and UPI intent after check payment status api
    let apiPath = apiPaths[PAYMENT_CALLBACK_URL]; //register device api call
    apiPath = generateURLPath(apiPath, props.configData);
    let dataNew = {
        actionUrl: apiPath.URL,
        method: "post",
        type: "redirect",
        content: {
            TXNID: paytmStatus.txnId,
            BANKTXNID: paytmStatus.bankTxnId ?? "",
            ORDERID: paytmStatus.orderId,
            TXNAMOUNT: paytmStatus.txnAmount,
            GATEWAYNAME: paytmStatus.gatewayName ?? "",
            BANKNAME: paytmStatus.bankName ?? "",
            MID: paytmStatus.mid,
            PAYMENTMODE: paytmStatus.paymentMode ?? "UPI",
            TXNDATE: paytmStatus.txnDate,
            STATUS: paytmStatus.STATUS ?? paytmStatus.resultInfo.resultStatus,
            CURRENCY: "INR",
            RESPCODE: paytmStatus.resultInfo.resultCode,
            RESPMSG: paytmStatus.resultInfo.resultMsg,
            CBUPIQR: "UPIQR"
        }
    }
    if (paytmStatus?.paymentMode == "WALLET") delete dataNew?.content?.CBUPIQR;
    setPaymentHTML(dataNew);
}
handleClickUPIMobile (){
    paytmOrder() {
        getPayTMOrderAPI()
        getPayTMInitiateAPI() 
        handleInitProcessApiError()
    }
    paymentProcessAPI() 
    paymentProcessAPI = {
        "success": true,
        "results": {
            "body": {
                "resultInfo": {
                    "resultStatus": "S",
                    "resultCode": "0000",
                    "resultMsg": "Success",
                    "retry": false
                },
                "callBackUrl": "https://test.api.sa.checkout.abfrl.in/webhook/payTMCallback",
                "deepLinkInfo": {
                    "deepLink": "upi://pay?pa=abfrlp002@paytm&pn=TestMerchant&mc=7221&tid=PYTM3080913368036300801&tr=3080913368036300801&am=2499&cu=INR",
                    "orderId": "SA787677876"
                }
            },
            "transactionToken": "a72d499f-0449-46d8-a863-a7f0b75cf5d4",
            "orderId": "787677876",
            "pspLinks": {
                "phonepe": "phonepe://pay?pa=abfrlp002@paytm&pn=TestMerchant&mc=7221&tid=PYTM3080913368036300801&tr=3080913368036300801&am=2499&cu=INR",
                "gpay": "tez://upi/pay?pa=abfrlp002@paytm&pn=TestMerchant&mc=7221&tid=PYTM3080913368036300801&tr=3080913368036300801&am=2499&cu=INR",
                "paytm": "paytmmp://pay?pa=abfrlp002@paytm&pn=TestMerchant&mc=7221&tid=PYTM3080913368036300801&tr=3080913368036300801&am=2499&cu=INR"
            }
        },
        "msg": [
            "SUCCESS"
        ],
        "cache": 0,
        "ttl": 0,
        "hash": "6a6424bfd31d1e11255eb0ed0be53938.0272cc6442cde26af1de93328fe8370d.35fa5ce052b6b1546674ed25eb1362e9"
    }
    openAppUPISection(){
        checkPaymentStatusAPI() {
            paymentStatusAPI()
            paytmCallbackAPI(){
                setPaymentHTML() 
            }

        }

    }
}

}

//desktop UPI 
const desktopUPI = () => {
    const handleSubmitUPIIDOnline = async (clickEvent = false) => {
        //UPI id submit
        if (UPIInput !== "") {
            const passData = {
                accessToken: props.paytmAccessData?.accessToken,
                referenceId: props.paytmAccessData?.referenceId,
                vpa: UPIInput,
                brand: "trendin",
            }
            setBtnDisable(true)
            dispatch({ type: LOADING_MESSAGE, payload: "INITIATING PAYMENT" });
            dispatch({ type: SHOW_LOADER, payload: true });
            const validateQRCode = await validateUPIVPANumber(passData, props.configData);
            if (validateQRCode && validateQRCode.success) {
                const orderInitRes = await paytmOrder('UPI')
                if (orderInitRes && orderInitRes.success && orderInitRes.results.length > 0) {
                    const data = {
                        orderId: parseInt(orderInitRes.results[0].orderId),
                        transactionToken: orderInitRes.results[0].txnToken,
                        requestType: "NATIVE",
                        payerAccount: UPIInput,
                        finalPayment: true,
                        paymentMode: "UPI",
                        brand: "trendin",
                        authMode: "USRPWD"
                    }
                    const pmtProcessReponse = await paymentProcessAPI(data, props.configData);
                    if (pmtProcessReponse && pmtProcessReponse.success && pmtProcessReponse.results && pmtProcessReponse.results.body && pmtProcessReponse.results.body.bankForm) {
                        const adobePush = await handleAdobePlaceOrderClick();
                        if (adobePush) {
                            removeSession(storedOrderId + PAYTM_WALLETINFO);
                            removeSession(storedOrderId + PAYTM_WALLET_INIT_RES);
                            setPaymentHTML(pmtProcessReponse.results.body.bankForm.redirectForm)
                        };
                    } else {
                        const adobePush = await handleAdobePlaceOrderFail();
                        if (adobePush) {
                            setUPIInputErr("Invalid UPI ID, Try Again.")
                            setBtnDisable(false)
                            dispatch({ type: SHOW_LOADER, payload: false });
                            handleInitProcessApiError(pmtProcessReponse);
                        }
                        return props.getCartItem(true)
                    }
                } else {
                    showToasterMessage(orderInitRes.msg)
                    dispatch({ type: SHOW_LOADER, payload: false });
                }
            } else {
                let errorMessage = validateQRCode?.results?.body?.resultInfo?.resultMsg ?? "Invalid UPI ID, Try Again."
                if (validateQRCode?.results?.body?.resultInfo && validateQRCode?.results?.body?.resultInfo?.resultCode === "1006") {
                    errorMessage = errorMessage + ", Try Again.";
                    props.getPaymentAccessToken();
                }
                setUPIInputErr(errorMessage)
                setBtnDisable(false)
                dispatch({ type: SHOW_LOADER, payload: false });
                //showToasterMessage(validateQRCode?.msg);
            }
        } else {
            if (clickEvent == "orderSummaryClick") {
                if (props.handleAccordianChange) {
                    props.handleAccordianChange(PAYMENT, true)
                }
                showToasterMessage("Please fill all valid details to place order")
            }
            setUPIInputErr("Please enter UPI id");
        }
        dispatch({ type: LOADING_MESSAGE, payload: "" });
        props.setProceedButton(false)
    }
} 







