variable "static_web_page_user" {}

variable "static_web_page_bucket" {}

variable "static_web_page_allowed_ip_addresses" {
  default = []
}

provider "aws" {
  region = "eu-west-1"
}

resource "aws_iam_user" "user" {
  name = "${var.static_web_page_user}"
}

resource "aws_iam_user_policy" "user_policy" {
  name = "Allow_S3_bucket_read_write"
  user = "${aws_iam_user.user.name}"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "s3:ListAllMyBuckets"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket",
        "s3:PutObject",
        "s3:PutObjectAcl"
      ],
      "Resource": [
        "arn:aws:s3:::${var.static_web_page_bucket}",
        "arn:aws:s3:::${var.static_web_page_bucket}/*"
      ]
    }
  ]
}
EOF
}

data "aws_iam_policy_document" "policy" {
  statement {
    effect = "Allow"

    actions = [
      "s3:DeleteObject",
      "s3:GetObject",
      "s3:GetObjectAcl",
      "s3:PutObject",
      "s3:PutObjectAcl",
    ]

    resources = [
      "arn:aws:s3:::${var.static_web_page_bucket}/*",
    ]

    principals = {
      type        = "AWS"
      identifiers = ["${aws_iam_user.user.arn}"]
    }
  }

  statement {
    effect = "Allow"

    actions = [
      "s3:GetObject",
    ]

    resources = [
      "arn:aws:s3:::${var.static_web_page_bucket}/*",
    ]

    principals = {
      type        = "AWS"
      identifiers = ["*"]
    }
  }
}

resource "aws_s3_bucket" "bucket" {
  bucket = "${var.static_web_page_bucket}"
  policy = "${data.aws_iam_policy_document.policy.json}"
  acl    = "public-read"

  website {
    index_document = "index.html"
    error_document = "index.html"
  }

  tags {
    Name        = "mubudget"
    Environment = "Dev"
  }
}
