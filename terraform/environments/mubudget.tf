module "mubudget" {
  source = "../modules/"

  static_web_page_bucket = "www.mubudget.tk"
  static_web_page_user   = "mubudget-s3-upload"
}
