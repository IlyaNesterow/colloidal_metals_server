
class InvalidPasswordError(ValueError):
    pass

class InvalidUsernameError(ValueError):
    pass

class InvalidToken(ValueError):
    pass

class MissingCredentialsError(ValueError):
    pass

class AuthError(ValueError):
    pass

class FailedToUploadError(SystemError):
    pass

class FormatError(ValueError):
    pass