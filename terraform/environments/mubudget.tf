module "mubudget" {
  source = "../modules/"

  static_web_page_bucket = "mubudget.com"
  static_web_page_user   = "mubudget-s3-upload"
}
