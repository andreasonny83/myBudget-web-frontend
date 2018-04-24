FROM hashicorp/terraform:light

ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY

WORKDIR /app/terraform

ENV HOME=/home

# Install the AWS CLI
RUN \
  wget "s3.amazonaws.com/aws-cli/awscli-bundle.zip" -O "awscli-bundle.zip" && \
  unzip awscli-bundle.zip && \
  apk add --update python && \
  rm /var/cache/apk/* && \
  ./awscli-bundle/install -i /usr/local/aws -b /usr/local/bin/aws && \
  rm awscli-bundle.zip && \
  rm -rf awscli-bundle

# An example invocation of the AWS CLI to prove AWS credentials have
# been properly passed.
RUN aws s3 ls

ENTRYPOINT ["terraform"]
