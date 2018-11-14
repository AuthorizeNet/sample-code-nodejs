'use strict';

var ApiContracts = require('authorizenet').APIContracts;
var ApiControllers = require('authorizenet').APIControllers;
var utils = require('../utils.js');
var constants = require('../constants.js');
var Map = require('collections/map');//added to iterate through loop by me

function getaccountupdaterJobDetails(callback) {
  var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
	merchantAuthenticationType.setName(constants.apiLoginKey);
	merchantAuthenticationType.setTransactionKey(constants.transactionKey);
	var month = '2018-08';
    var modifiedTypeFilter = 'all';
    var refId='123456'
    var paging = new ApiContracts.Paging();
	paging.setLimit(36);
	paging.setOffset(1);
	var subscriptionId = [] ;
    
   var getRequest = new ApiContracts.GetAUJobDetailsRequest();
	getRequest.setMerchantAuthentication(merchantAuthenticationType);
	getRequest.setMonth(month);
	getRequest.setPaging(paging);
    getRequest.setModifiedTypeFilter(modifiedTypeFilter);
    getRequest.setRefId(refId);
    
    var ctrl = new ApiControllers.GetAUJobDetailsController(getRequest.getJSON());
      ctrl.execute(function () {
		var apiResponse = ctrl.getResponse();
		var response = new ApiContracts.GetAUJobDetailsResponse(apiResponse);
		//pretty print response
		//console.log(JSON.stringify(response, null, 2));
		if (response != null) {
			if (response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK) {
				//console.log('Successfully created ' +  response.getAuDetails());
				if (response.getAuDetails == null)
					return response;
				else{
					console.log('refId :'+response.refId)
					console.log('Result Code: ' + response.getMessages().getResultCode());
					console.log('message:')
				    console.log('Code: ' + response.getMessages().getMessage()[0].getCode());
				    console.log('text: ' + response.getMessages().getMessage()[0].getText());
				 //console.log('Successfully created audetails ' + JSON.parse(JSON.stringify(response.getAuDetails().getAuUpdateOrAuDelete())))
					console.log('total no in result set is :-'+ response.totalNumInResultSet)
					console.log('auupdate : ');

				  var audetails = response.getAuDetails()
				  var auupdate=audetails.auUpdate
				
				   for (var i=0;i<auupdate.length;i++)
				    {
						
						console.log("**** AU Update Start ****'")
					 console.log("\t" +'customerProfileID:'+ auupdate[i].getCustomerProfileID());
					 console.log("\t" +'customerPaymentProfileID:'+ auupdate[i].getCustomerPaymentProfileID());
					 console.log("\t" +'customerFirstname:'+ auupdate[i].getFirstName());
					 console.log("\t" +'customerLast name:'+ auupdate[i].getLastName());
					 console.log("\t" +'UpdateTimeUTC:'+ auupdate[i].getUpdateTimeUTC());
					 console.log("\t" +'AuReasonCode:'+ auupdate[i].getAuReasonCode());
					 console.log("\t" +'ReasonDescription:'+ auupdate[i].getReasonDescription());
                      //if(audetails in ApiContracts.ListOfAUDetailsType.AuUpdateType){
						
						if ((auupdate[i].getNewCreditCard())!=null){
							var newcreditcard=auupdate[i].getNewCreditCard()
							console.log("Fetching new credit crd details:-")
							console.log("\t" +'CardNumber:'+ newcreditcard.getCardNumber())
							console.log("\t" +'expirationDate:'+ newcreditcard.getExpirationDate())
							console.log("\t" +'cardType:'+ newcreditcard.getCardType())
						}
						if ((auupdate[i].getOldCreditCard())!=null){
							   var oldcreditcard=auupdate[i].getOldCreditCard()
							   console.log("old credit crd details:-")
							   console.log("\t" +'CardNumber:'+ newcreditcard.getCardNumber())
							   console.log("\t" +'expirationDate:'+ newcreditcard.getExpirationDate())
							   console.log("\t" +'cardType:'+ newcreditcard.getCardType())
						} 
						if ((auupdate[i].getSubscriptionIdList())!=null){
							console.log("\t" +'SubscriptionIdlist:');
							
							var subscriptionids=auupdate[i].getSubscriptionIdList()
							var subs=subscriptionids.subscriptionId
							for (var j=0; j<subs.length; j++){
							console.log("\t" +'SubscriptionId:'+ subs[j])}
						}  
						   console.log("**** AU Update END ****'")
					}
					
					  
					var audelete=audetails.auDelete
					for (var i=0;i< audelete.length;i++){
							console.log("**** AU Delete Start ****'")
							console.log("\t" +'customerProfileID:'+  audelete[i].getCustomerProfileID());
					         console.log("\t" +'customerPaymentProfileID:'+  audelete[i].getCustomerPaymentProfileID());
					          console.log("\t" +'customerFirstname:'+  audelete[i].getFirstName());
					          console.log("\t" +'customerLast name:'+  audelete[i].getLastName());
					          console.log("\t" +'UpdateTimeUTC:'+  audelete[i].getUpdateTimeUTC());
					         console.log("\t" +'AuReasonCode:'+ audelete[i].getAuReasonCode());
					          console.log("\t" +'ReasonDescription:'+  audelete[i].getReasonDescription());
							 
					        if(( audelete[i].getCreditCard())!=null){
						         var creditcard= audelete[i].getCreditCard()
						      console.log("\t" +'CardNumber:'+ creditcard.getCardNumber())
					           console.log("\t" +'expirationDate:'+ creditcard.getExpirationDate())
					           console.log("\t" +'cardType:'+ creditcard.getCardType())
					        }
					        if (( audelete[i].getSubscriptionIdList())!=null){
						       console.log("\t" +'SubscriptionIdlist:');
							  var subscriptionids= audelete[i].getSubscriptionIdList()
							  var subs=subscriptionids.subscriptionId
							  for (var j=0; j<subs.length; j++){
							  console.log("\t" +'SubscriptionId:'+ subs[j])}
							}  
							console.log("**** AU Delete END ****'") 
					}
					   

						
					   
				}
					
	        }
			else {
				console.log('Result Code: ' + response.getMessages().getResultCode());
				console.log('Error Code: ' + response.getMessages().getMessage()[0].getCode());
				console.log('Error message: ' + response.getMessages().getMessage()[0].getText());
				
			}
		}
		else {
			console.log('Null response received');
		}

		callback(response);
	});
}

		
if (require.main === module) {
	getaccountupdaterJobDetails(function () {
		console.log('getAUJobDetails call complete.');
	});
}

module.exports.getaccountupdaterJobDetails = getaccountupdaterJobDetails;
