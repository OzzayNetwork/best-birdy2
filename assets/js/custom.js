$(window).on('load', function() {
    setTimeout(function() {
        $("#subscribeModal").modal("show")
    }, 0);

    $('body').on('click', '.upload-the-contacts', function() {
        $('.selected-contacts-message').removeClass('d-none')

    })
    $('body').on('click', '.write-msg-btn', function() {
        $('.email-overlay').removeClass('d-none')
        setTimeout(function() {
            $('.the-message-maker').addClass('email-overlay-transform');
        }, 0)

    });
    $('body').on('click', '.close-message-maker', function() {
        $('.the-message-maker').removeClass('email-overlay-transform')
        setTimeout(function() {
            $('.email-overlay').addClass('d-none');
        }, 200);

    });

    $('body').on('click', '.minimize', function() {
        $(this).parent().parent().parent().parent().siblings().toggleClass('d-none');
        $('.email-overlay').toggleClass('p-relative')
    });
    $("body").on('change', '.contacts-table tbody input', function() {
        var theTable = $(this).parent().parent().parent().parent().parent();
        if ($(this).is(':checked')) {
            $('.delete-tool-bar').removeClass('d-none').prev().addClass('d-none');

            $(theTable).children('tr').each(function(index) {
                //console.log(index + ": " + $(this).text());
                var theColumn = $(this).children('td').eq(0).find('input');
                if (theColumn.is(':checked')) {
                    // alert('checked');
                    $('#selectAll').prop('checked', true);
                } else {
                    $('#selectAll').prop('checked', false);
                    return false
                }
            });
        } else {
            $('#selectAll').prop('checked', false);
        }
    })
    $('body').on('change', '#selectAll', function() {
        var theTable = $(this).parent().parent().parent().parent().siblings('tbody');

        if ($(this).is(':checked')) {
            $('.delete-tool-bar').removeClass('d-none').prev().addClass('d-none')
            $(theTable).children('tr').each(function(index) {
                //console.log(index + ": " + $(this).text());
                var theColumn = $(this).children('td').eq(0).find('input');
                theColumn.prop('checked', true)
            });

        } else {
            $('.delete-tool-bar').addClass('d-none').prev().removeClass('d-none');
            $(theTable).children('tr').each(function(index) {
                //console.log(index + ": " + $(this).text());
                var theColumn = $(this).children('td').eq(0).find('input');
                theColumn.prop('checked', false);
            });
        }
    })
    $("body").on('change', '[name="letting-nature"]', function() {
        var theVal = $(this).val();
        if (theVal != 1) {
            // alert('checked');
            $('.per-commision').removeClass('d-none')
        }
        if (theVal == 2) {
            $('.per-commision').addClass('d-none')
        }

    });

    $("body").on('change', '[name="roomamte"]', function() {
        var theVal = $(this).val();
        if (theVal == "yes") {
            // alert('checked');
            $('.has-roomate').slideDown().removeClass('d-none');
        } else {
            $('.has-roomate').slideUp().addClass('d-none');
        }

    });

    showDayInput();
    chargeNatureInput()

    function showDayInput() {
        var theVal = $('[name="invoice-period"]').val();
        if (theVal != 'random-day') {
            // alert('checked');
            $('.invoicing-day').removeClass('d-none')
        } else {
            $('.invoicing-day').addClass('d-none')
        }
    }

    function chargeNatureInput() {
        var theVal1 = $('[name="fee-nature"]').val();
        //alert(theVal1)
        if (theVal1 != 'random-fee') {
            // alert('checked');
            $('.charge-determiner').slideDown();
        } else {
            $('.charge-determiner').slideUp();
        }


    }
    $('body').on('change', '[name="check-constant"]', function() {
        var theVal = $(this).val();
        if (theVal == "constant-yes") {
            $('.amount-entries').slideDown();

        } else {
            $('.amount-entries').slideUp();
        }
    })

    $("body").on('change', '[name="fee-nature"]', function() {
        var theVal1 = $(this).val();
        if (theVal1 != 'random-fee') {
            $('.charge-determiner').slideDown();
        } else {
            $('.charge-determiner').slideUp();

        }

        if (theVal1 == "per-on-rent") {
            $('.percentage-fee-input').slideDown().siblings().slideUp();
        }
        if (theVal1 == "multiple-on-rent") {
            $('.multiplier-fee-input').slideDown().siblings().slideUp();
        }
        if (theVal1 == "fixed-amount") {
            $('.fixed-fee-input').slideDown().siblings().slideUp();
        }

        if (theVal1 == "fixed-amount") {
            $('.constant-checker').slideUp();
            $('[name="check-constant"]').val('constant-yes');
        } else {
            $('.constant-checker').slideDown();
        }
    });

    $('body').on('change', '#tenant-type', function() {
        var theVal = $(this).val();
        if (theVal == "individual") {
            $('.tenant-indidual-type').removeClass('d-none').siblings('.tenant-company-type').addClass('d-none')

        } else {
            $('.tenant-company-type').removeClass('d-none').siblings('.tenant-indidual-type').addClass('d-none')
        }
    })

    $("body").on('change', '[name="invoice-period"]', function() {
        var theVal = $(this).val();
        if (theVal != 'random-day') {
            // alert('checked');
            $('.invoicing-day').slideDown();
        } else {
            $('.invoicing-day').slideUp()
        }

    })

    $('body').on('click', '.clone-fileds', function() {

        $('.selectpicker').each(function(index) {
            $(this).selectpicker('destroy');

        });
        var theParent = $(this).parent().parent().siblings('.clone-cont');
        var cloneMe = theParent.children('.clone-me').eq(0);
        cloneMe.clone().appendTo(theParent)

        $('select.form-control').each(function(index) {
            $(this).selectpicker('render').addClass('selectpicker');

        });
    })

    // calculating rent totals
    $('.rent-invoicing td input').on('keyup', function() {
        // alert("changed");
        var monthlyFee = 0;
        var depositFee = 0;
        var theval = $(this).val();
        var theIndex = $(this).parent('td').index();
        var theBody = $(this).parent().parent().parent();
        // alert(theIndex);

        $(theBody).children('tr').each(function(index) {
            var invoiceItemName = $(this).children('td').eq(theIndex).attr('invoice-item-name');
            var isMonthlyItem = $(this).children('td').eq(theIndex).attr('invoice-permonth');
            var isDepositItem = $(this).children('td').eq(theIndex).attr('deposit-amount');
            var theCell = $(this).children('td').eq(theIndex);
            var theAdditionalVal;

            if (theCell.find('input').length) {
                theAdditionalVal = parseFloat(theCell.children('input').val())
            } else {
                theCell.attr('the-val')
                theAdditionalVal = parseFloat(theCell.attr('the-val'))
                console.log(theAdditionalVal);
                if (theCell.attr('per-of')) {
                    // alert("yes it is a percentage")
                    var percentageOff = theCell.attr('per-of');
                    var theOutput;
                    var thePer = theAdditionalVal

                    $(theBody).children('tr').each(function(index) {
                        var theInputName = $(this).children('td').eq(theIndex).attr('invoice-item-name');
                        var thePricipleVal;
                        if ($(this).children('td').eq(theIndex).find('input').length) {
                            thePricipleVal = parseFloat($(this).children('td').eq(theIndex).children('input').val())
                        } else {
                            thePricipleVal = parseFloat($(this).children('td').eq(theIndex).attr('the-val'))
                        }
                        if (theInputName == percentageOff) {
                            // alert("we found a match");
                            theOutput = (thePer / 100) * thePricipleVal;
                            console.log("the tax percentage was " + thePer + "% The Principle value was " + thePricipleVal + " The calculated intrest was " + theOutput);
                            // alert(theOutput)
                            theAdditionalVal = theOutput;

                        }

                    });
                    $(this).children('td').eq(theIndex).text("KES " + numeral(theAdditionalVal).format('0,0') + " (" + thePer + "%)")
                }
            }

            if (isMonthlyItem == "true") {
                monthlyFee = theAdditionalVal + parseFloat(monthlyFee);
            }
            if (isDepositItem == "true") {
                depositFee = theAdditionalVal + parseFloat(depositFee);
            }

            function findingPerVal(thePerVal) {
                var percentageOff = theCell.attr('per-of');
                var theOutput;
                var thePer = thePerVal

                $(theBody).children('tr').each(function(index) {
                    var theInputName = $(this).children('td').eq(theIndex).attr('invoice-item-name');
                    var thePricipleVal;
                    if ($(this).children('td').eq(theIndex).find('input').length) {
                        thePricipleVal = parseFloat($(this).children('td').eq(theIndex).children('input').val())
                    } else {
                        thePricipleVal = parseFloat($(this).children('td').eq(theIndex).attr('the-val'))
                    }
                    if (theInputName == percentageOff) {
                        // alert("we found a match");
                        theOutput = (thePer / 100) * thePricipleVal;
                        console.log("the tax percentage was " + thePer + "% The Principle value was " + thePricipleVal + " The calculated intrest was " + theOutput);

                    } else {
                        theOutput = thePricipleVal
                    }
                    return theOutput;

                });
            }

        });
        $('.rent-invoicing tfoot').children('tr.deposit-fee').children('th').eq(theIndex).text("KES " + numeral(depositFee).format('0,0'));
        $('.rent-invoicing tfoot').children('tr.monthly-fee').children('th').eq(theIndex).text("KES " + numeral(monthlyFee).format('0,0'));

        console.log(depositFee)
            // alert(monthlyFee);


    });
    $('.create-property').on('click', 'a', function() {

        if ($(this).attr("href") == "#finish") {
            $("#createdModal").modal("show");
            setTimeout(function() {
                $('.loading-cont').addClass('d-none').siblings('.modal-body').removeClass('d-none')
            }, 4000);
        }


    });
    $('body').on('click', '.stay-on-page', function() {


        window.location.reload();
    });
    $('.payment-metho').on('change', function() {
        var theMethod = $(this).val();
        alert(theMethod);
        if (theMethod == "MPESA") {
            $('.phone-num').removeClass('d-none');

        } else {
            $('.phone-num').addClass('d-none');
        }
    });

    $('.payment-options').on('changed.bs.select', function(e, clickedIndex, isSelected, previousValue) {
        var theOption = $(this).val()
        if (theOption == "MPESA") {
            $('.mpesa-phone').removeClass('d-none');
            $('.mpesa-alert').removeClass('d-none').siblings().addClass('d-none');

        }

        if (theOption == "CASH") {
            $('.mpesa-phone').addClass('d-none')
            $('.cash-alert').removeClass('d-none').siblings().addClass('d-none');

        }
        if (theOption == "Print Invoice") {
            $('.mpesa-phone').addClass('d-none')
            $('.invoice-alert').removeClass('d-none').siblings().addClass('d-none');

        }

    });
    $('.payment-method').on('changed.bs.select', function(e, clickedIndex, isSelected, previousValue) {
        if (clickedIndex == 1) {
            $('.phone-num').removeClass('d-none');

        } else {
            $('.phone-num').addClass('d-none');
        }
    });

    $('#agreement-type').on('changed.bs.select', function(e, clickedIndex, isSelected, previousValue) {
        var theVal = $(this).val();
        // alert(theVal);
        if (theVal == "Unit Letting") {
            $('.unit-letting-option').removeClass('d-none');
            //alert("it is unt letting")

        } else {
            $('.unit-letting-option').addClass('d-none')
        }
    });

    $('.premises-name-select').on('changed.bs.select', function(e, clickedIndex, isSelected, previousValue, dataContent) {
        var theVal = e.target.value;
        //alert(theVal)
        $('.prem-name').text(theVal)

    })


    $('.house-num').on('changed.bs.select', function(e, clickedIndex, isSelected, previousValue, dataContent) {
        var theVal = e.target.value;
        var dataTypeAttribute = $('option:selected', this).attr("data-content");
        console.log(dataTypeAttribute);

        var url = '/Controller/Action?id=11112&value=4444';
        //alert(dataTypeAttribute.split('</span>')[1]);
        dataTypeAttribute = dataTypeAttribute.split("tenant d-none'>")[1];
        dataTypeAttribute = dataTypeAttribute.split("</span>")[0];
        $('.the-tenant-is').text(dataTypeAttribute).parent().removeClass('d-none')
        $('.hse-num').text(theVal)

    })

    $('.occupation-type').on('changed.bs.select', function(e, clickedIndex, isSelected, previousValue) {
        var theVal = $(this).val();


        if (theVal == "employed") {
            $('.employed').removeClass('d-none')
            $('.employed').slideDown().siblings().slideUp();
            //alert("we are here")

        }
        if (theVal == "student") {
            $('.parents').removeClass('d-none').slideDown().siblings().slideUp()

        }
        if (theVal == "self employed") {
            $('.self-employed').removeClass('d-none').slideDown().siblings().slideUp()

        }
        if (theVal == "pension") {
            $('.self-employed').slideUp().siblings().slideUp()

        }
        if (theVal == "unemployed") {
            $('.self-employed').slideUp().siblings().slideUp()

        }
    });

    $('.water-servicing').on('change', function(e) {
        var theVal = $(this).val();
        // alert(theVal);
        if (theVal == "3") {
            $('.rate-perunit-water').removeClass('d-none');
            //alert("it is unt letting")
            $('.rate-per-unit').attr("focus", true)

        } else {
            $('.rate-perunit-water').addClass('d-none')
        }
    });

    $('#landlord-type').on('change', function() {
        var theSeledtedValue = $(this).val();
        if (theSeledtedValue == "company") {
            $('.individual-landlord').removeClass('d-none').next().addClass('d-none');

        } else {
            $('.individual-landlord').addClass('d-none').next().removeClass('d-none');

        }
    });

    $('.invoice-table').on('keyup', 'input', function() {
        var theAdditionalValue;
        var total = 0;
        var theTable = $(this).parent().parent().parent().parent();
        console.log(theTable)
        $(theTable).children('tbody').find('input').each(function(index) {

            var theVal = $(this).val();
            if ($(this).val() == "") {
                theVal = 0;
            }
            total = parseFloat(theVal) + parseFloat(total);
            console.log(total);
            //alert("hhghj")
        });

        var remainingBal = $('.the-balance').text();
        remainingBal = parseFloat(remainingBal.replace(/[^0-9]/g, ''));
        remainingBal = remainingBal - total;
        $('.the-balance').text("KES " + numeral(remainingBal).format('0,0'));



        $('.invoiceTotalPay').val("KES " + numeral(total).format('0,0'))
        $('.text-total').text("KES " + numeral(total).format('0,0'));

    });

    $("body").on('change', '[name="debit-this"]', function() {
        var theVal = $(this).val();
        if (theVal == "yes") {
            // alert('checked');
            $('.debit-tenant-list').removeClass('d-none');
            $('.debit-tenant-button').removeClass('d-none').siblings().addClass('d-none');
        } else {
            $('.debit-tenant-list').addClass('d-none')
            $('.debit-tenant-button').addClass('d-none').siblings().removeClass('d-none');
        }

    });

    $("body").on('change', '[name="credit-for"]', function() {
        var theVal = $(this).val();
        if (theVal == "tenant") {
            // alert('checked');
            $('.landlord-credit-colection').removeClass('d-none').siblings('.credit-options').addClass('d-none');
        }
        if (theVal == "invoice") {
            $('.invoice-credit-colection').removeClass('d-none').siblings('.credit-options').addClass('d-none');
            $('#debit-no').prop("checked", true);
            $('.debit-tenant-list').addClass('d-none')
            $('.debit-tenant-button').addClass('d-none').siblings().removeClass('d-none');

        }
    });

    // creating invoices
    $("body").on('change', '[name="invoice-for"]', function() {
        var theVal = $(this).val();
        if (theVal == "tenant") {
            // alert('checked');
            $('.tenant-invoice-container').removeClass('d-none').siblings('.invoice-options').addClass('d-none');
        }
        if (theVal == "other") {
            $('.others-invoice-container').removeClass('d-none').siblings('.invoice-options').addClass('d-none');
        }
    });


    $('body').on('keyup', '.credit-amount', function() {
        var theAmount = $(this).val();
        theAmount = parseFloat(theAmount);
        $('.debited-amount').text("KES " + numeral(theAmount).format('0,0'));

        var remainingBal = $('.the-total').text();
        remainingBal = remainingBal.replace(/[^0-9]/g, '');
        remainingBal = parseFloat(remainingBal);
        var NewBal = remainingBal - theAmount;
        $('.the-debit-balance').text("KES " + numeral(NewBal).format('0,0'));



    });

    // closing the creditnote details modal
    $('.submit-credit-details').on('click', function() {
        $('.debit-tenant-modal').modal('hide');
        setTimeout(function() {
            $("#creditNoteModalLoad").modal("show")
        }, 100);

        setTimeout(function() {
            $('#creditNoteModalLoad .loading-cont').addClass('d-none')
            $('#creditNoteModalLoad .loading-cont').next().removeClass('d-none')
                //$("#creditNoteModalLoad").modal("show")
        }, 2000);
    });

    



    // the next button
    $('body').on('click','.kev-nxt', function(){

        var countTheSteps = parseFloat($("nav ul li").length);

        var countSteps=$('#kev-step-form .step-cont').length;

        

        var theActiveOne=$('#kev-step-form nav').find('.active');
        var activeStep=$('#kev-step-form .active-step');

        let activeStepIndex=theActiveOne.parent().index()
        activeStepIndex=parseFloat(activeStepIndex)+2;
        //alert("the active step is "+activeStepIndex)

        // alert("the total links are :"+countTheSteps);
        // alert("The current step is :"+activeStepIndex)



        if(countTheSteps==activeStepIndex){
            $(this).addClass('d-none');
            $('.kev-submit').removeClass('d-none');
        }
        else{
            // alert("we are not there yet")
        }

        activeStep.addClass('d-none').removeClass('active-step').next().addClass('active-step').removeClass('d-none');      
        theActiveOne.parent().next().children('a').addClass('active');
        theActiveOne.removeClass('active');
        $('.kev-prev').prop('disabled', false)

        
    })
   

    // the previouse button
    $('body').on('click','.kev-prev', function(){
        $('.kev-nxt').removeClass("d-none");
        $('.kev-submit').addClass('d-none');

        var countTheSteps = parseFloat($("nav ul li").length);
        var countSteps=$('#kev-step-form .step-cont').length;

        var theActiveOne=$('#kev-step-form nav').find('.active');
        var activeStep=$('#kev-step-form .active-step');
        activeStep.addClass('d-none').removeClass('active-step').prev().addClass('active-step').removeClass('d-none');

        theActiveOne.parent().prev().children('a').addClass('active');
        theActiveOne.removeClass('active');

        let activeStepIndex=theActiveOne.parent().index()
        activeStepIndex=parseFloat(activeStepIndex);
       

        if(activeStepIndex==1){
            $(this).prop('disabled', true)
        }

      
    });

    $('.select-revenue').on('changed.bs.select', function(e, clickedIndex, newValue, oldValue,value){
        //alert(this.value);
        if(this.value==="Rent"){
            $('.Rent-rev').removeClass("d-none").siblings().addClass('d-none')
        }
        if(this.value==="Parking"){
            $('.parking-rev').removeClass("d-none").siblings().addClass('d-none')
        }

        if(this.value==="Health"){
            $('.health-rev').removeClass("d-none").siblings().addClass('d-none')
        }

        if(this.value==="Trade"){
            $('.trade-rev').removeClass("d-none").siblings().addClass('d-none')
        }

        if(this.value==="Liquor"){
            $('.liquor-rev').removeClass("d-none").siblings().addClass('d-none')
        }

        if(this.value==="Landrates"){
            $('.landrate-rev').removeClass("d-none").siblings().addClass('d-none')
        }

        if(this.value==="plotRent"){
            $('.plot-rev').removeClass("d-none").siblings().addClass('d-none')
        }

        if(this.value==="plans"){
            $('.plans').removeClass("d-none").siblings().addClass('d-none')
        }

        if(this.value==="Advert"){
            $('.signs').removeClass("d-none").siblings().addClass('d-none')
        }
        if(this.value==="weight"){
            $('.weight-row').removeClass("d-none").siblings().addClass('d-none')
        }

        //alert(this.value)

        

        if(this.value==="Others"){

            $('.others-rev').removeClass("d-none").siblings().addClass('d-none')
            
            // $('.rev-options-cont').children('.row').each(function(index) {
            //     $(this).addClass('d-none')
            // });
        }
        
        
    } )

    // parking options
    $('.parking-category').on('change', function(){
        //alert(this.value);
        if(this.value==="seasonal"){
            $('.seasonal-duration').removeClass("d-none").siblings().addClass('d-none')
        }

        if(this.value!="seasonal"){
            $('.seasonal-duration').addClass("d-none")
        }

        if(this.value==="Offstreet"){
            $('.offstreet-duration').removeClass("d-none").siblings().addClass('d-none')
        }

        if(this.value!="Offstreet"){
            $('.offstreet-duration').addClass("d-none")
        }
        
    } )

    //hygiene options
    $('.hyginene-selector').on('change', function(){
        var theSelectedvalue=$(this).val()
        if(theSelectedvalue=="New Application"){
            $(".food-hygiene-cont .new-hygiene").removeClass('d-none').siblings().addClass('d-none')
        }

        if(theSelectedvalue=="Renewal"){
            $(".food-hygiene-cont .renew-hygene").removeClass('d-none').siblings().addClass('d-none')
        }
    })

    // handler selector
    $('.handler-selector').on('change', function(){
        var theSelectedvalue=$(this).val()
        //alert(theSelectedvalue)
        if(theSelectedvalue=="New Application"){
            $(".food-handler-cont .new-Handler").removeClass('d-none').siblings().addClass('d-none')
        }

        if(theSelectedvalue=="Renewal"){
            $(".food-handler-cont .renew-Handler").removeClass('d-none').siblings().addClass('d-none')
        }
    })

    //health selector
    $('.health-selector').on('change', function(){
        var theSelectedvalue=$(this).val()
        if(theSelectedvalue=="Food Hygien"){
            $(".hyginene-selector").removeClass('d-none').siblings('select').addClass('d-none')
            $('.health-options .food-hygiene-cont').removeClass('d-none').siblings().addClass("d-none")
        }

        if(theSelectedvalue=="Food Handler"){
            $(".handler-selector").removeClass('d-none').siblings('select').addClass('d-none')
            $('.health-options .food-handler-cont').removeClass('d-none').siblings().addClass("d-none")
        }
    })

    //liquor changes
    $('.liquor-selector').on('change', function(){
        var theSelectedVal=$(this).val()
        if(theSelectedVal==="New Application"){
            $('.liqur-options .new-application').removeClass('d-none').siblings().addClass('d-none')
        }

        if(theSelectedVal==="License Renewal"){
            $('.liqur-options .renew-liquor').removeClass('d-none').siblings().addClass('d-none')
        }
    })




    function find_max(nums) {

        let max_num = Number.NEGATIVE_INFINITY; // smaller than all other numbers

        for (let num of nums) {

            if (num > max_num) {
                // (Fill in the missing line here)

            }

        }

        return max_num;

    }

    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const d = new Date();
    let name = month[d.getMonth()];

    const mwaka = new Date();
    let huuMwaka = mwaka.getFullYear();
    var dd = String(today.getDate()).padStart(2, '0');

    $(".this-month").text(name + " " + huuMwaka);
    $('.today-date').text(name+" "+dd+" "+huuMwaka)

    

    



    //alert("done");
});

$(document).ready(function() {

    $('.dismin-modal').on('click', function(){
        $('#payment-modal').modal('hide')
    })

    $('.print-bill-btn').on('click', function(){
        // alert("clicked")
        $('.payment-next').click();
        $('.bill-modal-footer').removeClass('d-none')
    })
   
    //sending payment
    $('body').on('click','.payment-next', function(){
        // alert( $(".payment-panel-parent .payment-panel.payment-active-panel").index())

        $('.payment-prev').prop('disabled', false)       
        var countTheSteps = parseFloat($(".payment-panel-parent .payment-panel").length);
        var theCurrentIndex= $(".payment-panel-parent .payment-panel.payment-active-panel").index();
        theCurrentIndex=theCurrentIndex+1;
        if(theCurrentIndex!=countTheSteps){
            $('.payment-panel-parent').find('.payment-active-panel').addClass('d-none').removeClass('payment-active-panel').next().removeClass('d-none').addClass('payment-active-panel')
        }
        if (theCurrentIndex==countTheSteps-1) {
            $('.payment-next').addClass('d-none');
        }

        // else{
        //     $('.payment-next').addClass('d-none'); 
        // }
          
        

    })

    $('body').on('click', '.btn-next', function(){
        $(this).siblings('.btn-prev').prop('disabled', false)
        
        var theStepsCont=$(this).parent().parent().siblings('.steps-container')
        var numberOfChildren=theStepsCont.children().length
        var activeStedIndex=theStepsCont.children('.the-step.active').index()
        var activeStep=theStepsCont.children('.the-step.active')
        var nextStep=theStepsCont.children('.the-step.active').index()+1
        if(nextStep!=numberOfChildren){
            activeStep.addClass('d-none').removeClass('active').next().removeClass('d-none').addClass('active')
        }

        if(nextStep===numberOfChildren-1){
            $(this).prop('disabled', true).addClass('d-none')
            $(this).siblings('.btn-submit').removeClass('d-none')
        }

    })

    $('body').on('click', '.btn-prev', function(){

        $(this).siblings('.btn-next').prop('disabled', false).removeClass('d-none')
        $(this).siblings('.btn-submit').prop('disabled', false).addClass('d-none')
        
        var theStepsCont=$(this).parent().parent().siblings('.steps-container')
        var numberOfChildren=theStepsCont.children().length
        var activeStedIndex=theStepsCont.children('.the-step.active').index()
        var activeStep=theStepsCont.children('.the-step.active')
        var nextStep=theStepsCont.children('.the-step.active').index()-1
        if(nextStep>-1){
            activeStep.addClass('d-none').removeClass('active').prev().removeClass('d-none').addClass('active')
        }

        if(nextStep<1){
            $(this).prop('disabled', true)
           
        }

    })

    $('body').on('click','.payment-prev', function(){
        $('.payment-next').removeClass('d-none');  
        var countTheSteps = parseFloat($(".payment-panel-parent .payment-panel").length);
        var theCurrentIndex= $(".payment-panel-parent .payment-panel.payment-active-panel").index();
        if(theCurrentIndex!=0){
            $('.payment-panel-parent').find('.payment-active-panel').addClass('d-none').removeClass('payment-active-panel').prev().removeClass('d-none').addClass('payment-active-panel')
            $('.transaction-summary').addClass('d-none')
        }   
        
    });

    function containsWordOrSentence(str, wordOrSentence) {
        return str.includes(wordOrSentence);
      }


    $('body').on('change','#accessible-platforms', function(){

       

        var theVal=$(this).val()
        var dashboard=containsWordOrSentence(theVal,"County Biller Dashboard")
        var enforcementApp=containsWordOrSentence(theVal,"Collections & Enforcement App")
        var supervisor=containsWordOrSentence(theVal,"Supervision Mobile App")

        const dashboardCheckboxes = $('.dashboard-rights input[type="checkbox"]');
        const dashboardCheckboxes2 = $('.dashboard-modules input[type="checkbox"]');
        const enforcementCheckboxes = $('.enforcement-modules input[type="checkbox"]');
        const supervisorCheckboxes = $('.supervisor-modules input[type="checkbox"]');

        
        

        dashboardCheckboxes.prop('disabled', !dashboard);
        dashboardCheckboxes2.prop('disabled', !dashboard);

        enforcementCheckboxes.prop('disabled', !enforcementApp);
        supervisorCheckboxes.prop('disabled', !supervisor);

       

        
        
    })

    $('body').on('change','.check-dash', function(){
       //$('.check-dash').siblings('label').text("Show")

       var id = $(this).attr('id');

       var isChecked = isCheckboxChecked(id);

       if (isChecked) {
            $('.check-dash').siblings('label').text("Hide")
            $('.check-dash').prop("checked", true);

            $('.check-dash').siblings('label').text("Show").parent().parent().parent().parent().removeClass('bg-warning').addClass('bg-white').siblings().removeClass('d-none')
        } else {
            $('.check-dash').siblings('label').text("Show").parent().parent().parent().parent().addClass('bg-warning').removeClass('bg-white').siblings().addClass('d-none')
            $('.check-dash').prop("checked", false);
        }
    })

    function isCheckboxChecked(checkboxId) {
        var checkbox = document.getElementById(checkboxId);
        if (checkbox) {
          return checkbox.checked;
        } else {
          console.error("Checkbox with ID " + checkboxId + " not found.");
          return false; // Assuming unchecked if the checkbox is not found
        }
      }
      


    $('.selectpicker').selectpicker();
    $('.selectpicker').selectpicker('render')
});

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

  $('.btn-send').on('click', function(){
    $('.transaction-summary').addClass('d-none')
    $('.loader-panel').removeClass('d-none')
    $('#payment-modal .close-modal').addClass('d-none')
    // $('.new-alcohol-application').modal("close")

    // closing the invoicing modal
    $('.new-alcohol-application .btn-close').click()
    $('#receivePay .btn-close').click()

    // closing loader
    setTimeout(function() {
        $('.loader-panel').addClass('d-none')
        $('.sent-success').removeClass('d-none')
        $('#payment-modal .close-modal').removeClass('d-none')
        }, 4000); // 4000 milliseconds = 4 seconds


    $('.modal-footer-btn-pay').addClass('d-none')
    $('.bill-modal-footer').addClass('d-none')
  })

  $('.reg-payment').on('click', function(){
    $(this).parent().parent().addClass('d-none')
    // alert('clicked')
    $('.new-vehicles-container-modal').addClass('d-none').siblings('.loader-panel').removeClass('d-none')
    $('.add-car-modal address').addClass('d-none')
  })


//   selecteing liquore search method
$('.liq-search-method').on('change', function(e){
    var theVal=$(this).val()
    // alert(theVal)
    if(theVal=="search"){
        $('.business-id-search').removeClass('d-none').siblings().addClass('d-none')
    }

    if(theVal=="Unregestered Business"){
        $('.unregistered-biz-cont').removeClass('d-none').siblings().addClass('d-none')
    }
})
// end of liq search method

$('.search-bz-btn').on('click', function(e){
    
    $('.searching-biz-loader').removeClass('d-none').siblings().addClass('d-none')

    setTimeout(function() {
        $('.searching-biz-loader').addClass('d-none')
        $('.biz-search-results').removeClass('d-none')
    }, 4000); // 4000 milliseconds = 4 seconds
})

// generating invoice modal and staff
$('.generate-invoice-btn').on('click', function(e){
   $('.searching-modal-body').addClass('d-none')
   $('.receipt-billing-modal-body').removeClass('d-none')
   $('.liq-header').addClass('d-none')

//    hiding the loader during invoicing

   setTimeout(function() {
    $('.billing-receipting-loader').addClass('d-none')
    $('.generated-invoice').removeClass('d-none')
    }, 4000); // 4000 milliseconds = 4 seconds
})

//invoicing for fire certifictae
$('.go-to-assesment').on('click', function(){
    // alert("clicked")
    $('.business-id-search').addClass('d-none')
    $('.fire-assesment').removeClass('d-none')
    $('.business-selector').addClass('d-none')
})

$('.assesment-done-btn').on('click', function(){
    $('.fire-assesment').addClass('d-none')
    $('.fire-invoice-creator').removeClass('d-none')
})









//   the highlights slider

window.onload=function(){
	$('.todays-entries').slick({
	arrows:true,
	prevArrow:'<button type="button" class="slick-prev"></button>',
	nextArrow:'<button type="button" class="slick-next"></button>',
	centerMode:true,
	slidesToShow:7,
	speed: 7000,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: 'linear',
	slidesToScroll: 1,
	pauseOnFocus: true,
	variableWidth: true
	});
  };

//   selecting dire search method
  $('.fire-search-method').on('change', function(e){
    var theVal=$(this).val()
    // alert(theVal)
    //alert(theVal)
    if(theVal=="search"){
        $('.business-id-search').removeClass('d-none').siblings().addClass('d-none')
    }

    if(theVal=="Paid-incoice"){
        $('.inv-results').removeClass('d-none').siblings().addClass('d-none')
        //alert("paid invoices")
    }
})

// ??seraching for invoice
$('.inv-serach-btn').on('click', function(){
    
    $('.inv-loader').removeClass('d-none')
    $('.inv-details-cont').removeClass('d-none')
    setTimeout(function() {
        $('.inv-loader').addClass('d-none');
        $('.invoice-details').removeClass('d-none')
        $('.inv-results').addClass('d-none')
        $('.business-selector').addClass('d-none')
    }, 2000);
})

$('.btn-inv-details').on('click', function(){
    $(this).parent().parent().addClass('d-none').siblings().addClass('d-none')
    $('.assesment-invoice').removeClass('d-none')
})

$('.btn-assesment-nv').on('click', function(){
    $(this).parent().parent().addClass('d-none').siblings().addClass('d-none')
    $('.otp-invoice').removeClass('d-none')
})


$('.send-otp-inv').on('click', function(){
    $(this).parent().parent().addClass('d-none').siblings().addClass('d-none')
    $('.inv-loader').removeClass('d-none')

    setTimeout(function() {
        $('.inv-loader').addClass('d-none');
        $('.invoice-success-certificate').removeClass('d-none')
        
    }, 2000);
})

$('.bank-nxt-bank').on('click', function(){
    $('.bank-inputs').addClass('d-none').siblings().removeClass('d-none')
})

$('.bank-otp-input').on('keyup', function(){
    var theIputVal=$(this).val()
    if(theIputVal!=""){
        $(".btn-otp-submit").prop('disabled', false);
    }

    if(theIputVal===""){
        $(".btn-otp-submit").prop('disabled', true);
    }
})

$('.btn-otp-edit').on('click', function(){
    $('.bank-inputs').removeClass('d-none').siblings().addClass('d-none')  
})

$('.btn-otp-submit').on('click', function(){
    $('.payment-next').click()
})

// generating notices
$('.gen-notice').on('click', function(){
    $('.single-notice-generator').addClass('d-none').siblings('.justify-content-center').removeClass('d-none')

   

   
})

// generateing multiple invoices
$('.notice-gen').on('click', function(){
  
    
    $('.notice-loader-2').removeClass('d-none')
    $('.notice-created-cont').addClass('d-none')

    setTimeout(function() {
        $('.notice-loader-2').addClass('d-none');
        $('.notice-created-cont-2').removeClass('d-none')
        
    }, 2000);
 
})

//plot transfers
$('.transfer-select').on('change', function(){
    var theOptionSelected=$(this).val()
    // alert(theOptionSelected)

    if(theOptionSelected=="paid invoice"){
        $('.invoice-number-input').removeClass('d-none').siblings('.new-billing-transfer').addClass('d-none')                          
    }

    if(theOptionSelected=="bill-new"){
        $('.new-billing-transfer').removeClass('d-none').siblings('.invoice-number-input').addClass('d-none')                          
    }
})


$('.invoice-number-input .invoice-num-input').on('keyup', function(){
    var theIputVal=$(this).val()
    if(theIputVal!=""){
        $(".invoice-search").prop('disabled', false);
    }

    if(theIputVal===""){
        $(".invoice-search").prop('disabled', true);
    }
})



$('.invoice-number-input .invoice-search').on('click', function(){
    // alert("clicked")
    $(this).children('.spinner-border').removeClass('d-none').siblings().addClass('d-none')

    setTimeout(function() {
        $('.invoice-number-input').addClass('d-none').siblings('.invoice-results').removeClass('d-none')
        $('.transafer-option-selector').addClass('d-none')        
    }, 2000);
})

$('.transfer-cancel').on('click', function(){    
    location.reload();
})

$('.transafer-nxt').on('click', function(){
    $('.invoice-results').addClass('d-none').siblings('.new-owner-form').removeClass('d-none')
})

$('.finish-transfer').on('click', function(){
    $(this).children('.spinner-border').removeClass('d-none').siblings().addClass('d-none')

    setTimeout(function() {
        $('.new-owner-form').addClass('d-none').siblings('.transfer-successful').removeClass('d-none')        
    }, 2000);
   // 
})

$('.download-receipt-transfer').on('click', function(){
    

    setTimeout(function() {
        location.reload();
    }, 800);
   // 
})

$(document).ready(function(){

   
    $('.check-initiato').on('change', function(){

        var checker=$(this)

        function isChecked() {
            return checker.is(':checked');
        }

        console.log($(this).isChecked)

        if (isChecked()) {
            $('.initiate-realocation-btn').prop('disabled', false);
        } else {
            $('.initiate-realocation-btn').prop('disabled', true);
        }
      
    })

    $('.otp-trans-click').on('click', function(){
        var btn=$(this)
        var timer=60
        var seconds = 60;

    
        $(this).prop('disabled', true);

        setTimeout(function() {
            btn.prop('disabled', false);
        }, 60000);

        countdown()

      


        function countdown() {
            if (seconds >= 0) {
                $(".timer-txt").text(seconds+" Sec");
                seconds--;
                setTimeout(countdown, 1000);
            }
            
        }       

    })

    $('.initiate-realocation-btn').on('click', function(){
        var theBtn=$(this)
        $(theBtn).children('.spinner-border').removeClass('d-none').siblings().addClass('d-none')
        $(theBtn).prop('disabled', true);

        setTimeout(function() {
            $(theBtn).children('.spinner-border').addClass('d-none').siblings().removeClass('d-none')
            $(theBtn).prop('disabled', false);

            $('.transfer-confirmation').removeClass('d-none')
            $('.form-transfer-inputs').addClass('d-none')
        }, 2000);
        
    })

    $('.trans-prev').on('click', function(){
        $('.transfer-confirmation').addClass('d-none')
            $('.form-transfer-inputs').removeClass('d-none')
    })

    $('.finish-transfer').on('click', function(){
        

        setTimeout(function() {
            $('.details-modal').addClass('d-none')
            $('.transfer-realocation-successful').removeClass('d-none')
        }, 2000);
    })

    $('.submit-realocation-request').on('click', function(){

        var btn =$(this)
        btn.children(".spinner-border").removeClass('d-none').siblings().addClass('d-none')

        setTimeout(function() {
            btn.children(".spinner-border").addClass('d-none').siblings().removeClass('d-none')
            $('.transfer-request-sent').removeClass('d-none').siblings().addClass('d-none')
        }, 2000);
    })
               
})                     