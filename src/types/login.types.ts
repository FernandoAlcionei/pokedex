export type Credentials = {
    username: string;
    password: string;
}

export type LoginPayload = {
	username: string;
    password: string;
};

export type LoginResponse = {
    userId: string;
    name: string;
    lastname: string;
};