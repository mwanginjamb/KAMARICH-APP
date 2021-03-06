export class Requisition {
    constructor(
        public Key?: string,
        public No?: string,
        public Transfer_from_Code?: string,
        public Transfer_to_Code?: string,
        public In_Transit_Code?: string,
        public Posting_Date?: string ,
        public voucher_No?: string ,
        public Shortcut_Dimension_1_Code?: string ,
        public Shortcut_Dimension_2_Code?: string,
        public Assigned_User_ID?: string,
        public Status?: string,
        public Transfer_from_Name?: string,
        public Transfer_from_Name_2?: string,
        public Transfer_from_Contact?: string,
        public Shipment_Date?: string ,
        public Outbound_Whse_Handling_Time?: string,
        public Shipment_Method_Code?: string,
        public Shipping_Agent_Code?: string ,
        public Shipping_Agent_Service_Code?: string,
        public Shipping_Time?: string,
        public Shipping_Advice?: string ,
        public Transfer_to_Name?: string ,
        public Transfer_to_Name_2?: string ,
        public Transfer_to_Contact?: string ,
        public Receipt_Date?: string ,
        public Inbound_Whse_Handling_Time?: string ,
       // public TransferLines: [],
        public TransferLines?: { Transfer_Order_Line: []}  ,
    ) {}
}