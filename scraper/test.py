from urllib.parse import urlparse, parse_qs, urlunparse


def convert_url(original_url):
    # Parse the original URL
    parsed_url = urlparse(original_url)
    query_params = parse_qs(parsed_url.query)
    print(query_params)
    # Modify the parsed URL with the desired parameters
    parsed_url = parsed_url._replace(
        path='/eval/EvalGatekeeper/EvalGatekeeper')
    query_params['service'] = ['QuantitativeXls']

    # Reconstruct the modified URL
    modified_url = urlunparse(parsed_url._replace(query='&'.join(
        f'{key}={value[0]}' for key, value in query_params.items())))

    return modified_url


print(convert_url("https://www.applyweb.com/eval/new/coursereport?sp=76156&sp=3167&sp=155"))
