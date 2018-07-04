export const REGEXPS = {
    name: /^[A-Za-z]{1,32}$/,
    surname: /^[A-Za-z]{1,32}$/,
    middleName: /^[A-Za-z]{1,32}$/,
    email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    age: /^[1-9][0-9]?$/,
    password: /^[a-zA-Z0-9_\-]{10,}$/,
};

export const ACTION_TYPES = {
    START_LOADING: 'START_LOADING',
    FINISH_LOADING: 'FINISH_LOADING',
    SHOW_NOTIFICATION: 'SHOW_NOTIFICATION',
    AUTHORIZE: 'AUTHORIZE',
    CLEAR_FORM: 'CLEAR_FORM',
    LOAD_USER_INFO: 'LOAD_USER_INFO',
    ADD_USERS: 'ADD_USERS',
    ADD_NAME: 'ADD_NAME',
    ADD_SURNAME: 'ADD_SURNAME',
    ADD_MIDDLE_NAME: 'ADD_MIDDLE_NAME',
    ADD_EMAIL: 'ADD_EMAIL',
    ADD_AGE: 'ADD_AGE',
    ADD_GENDER: 'ADD_GENDER',
    ADD_PHOTO: 'ADD_PHOTO',
    ADD_PASSWORD: 'ADD_PASSWORD',
    VALIDATE_NAME: 'VALIDATE_NAME',
    VALIDATE_SURNAME: 'VALIDATE_SURNAME',
    VALIDATE_MIDDLE_NAME: 'VALIDATE_MIDDLE_NAME',
    VALIDATE_EMAIL: 'VALIDATE_EMAIL',
    VALIDATE_AGE: 'VALIDATE_AGE',
    VALIDATE_GENDER: 'VALIDATE_GENDER',
    VALIDATE_PHOTO: 'VALIDATE_PHOTO',
    VALIDATE_PASSWORD: 'VALIDATE_PASSWORD',
    ADD_POST_TEXT: 'ADD_POST_TEXT',
    ADD_POST_IMAGE: 'ADD_POST_IMAGE',
    ADD_POST: 'ADD_POST',
    REMOVE_POST_IMAGE: 'REMOVE_POST_IMAGE',
    CLEAR_POST_FIELDS: 'CLEAR_POST_FIELDS',
    LOAD_POSTS: 'LOAD_POSTS',
    REMOVE_POSTS: 'REMOVE_POSTS',
    DELETE_POST: 'DELETE_POST',
    ADD_OLD_PASSWORD: 'ADD_OLD_PASSWORD',
    ADD_NEW_PASSWORD: 'ADD_NEW_PASSWORD',
    ADD_CONFIRM_PASSWORD: 'ADD_CONFIRM_PASSWORD',
    CLEAR_PASSWORD_INPUTS: 'CLEAR_PASSWORD_INPUTS',
    REMOVE_USER_INFO: 'REMOVE_USER_INFO',
    SHOW_CONFIRM_MODAL: 'SHOW_CONFIRM_MODAL',
    CLEAR_CONFIRM_MODAL: 'CLEAR_CONFIRM_MODAL',
    SET_REGEXP: 'SET_REGEXP',
    CLEAR_DATA: 'CLEAR_DATA',
    REMOVE_USERS: 'REMOVE_USERS',
};

export const URLS = {
    SIGN_UP: '/sign_up',
    LOG_IN: '/log-in',
    EDIT_USER: '/edit-user',
    ADD_FRIEND: '/add-friend',
    REMOVE_FRIEND: '/remove-friend',
    GET_FRIENDS: '/get-friends',
    GET_USERS: '/get-users',
    UPLOAD_USER: '/upload-user',
    GET_USER_BY_TOKEN: '/get-user-by-token',
    ADD_POST: '/add-post',
    GET_ALL_POSTS: '/get-all-posts',
    DELETE_POST: '/delete-post',
    CHANGE_PASSWORD: '/change-password',
    CHANGE_LOCALE: '/change-locale',
};

export const preDelay = 1000;

export const LANGUAGES = {
    en: 'English',
    ru: 'Русский',
    ukr: 'Украинский',
};
export const TRANSLATIONS_OBJECT = {
    en: {
        application: {
            confirm: {
                deletePost: 'Delete post',
                removeFriend: 'Remove friend',
                areYouSure: 'Are you sure?'
            },
            deleteM: 'Delete',
            removeM: 'Remove',
            editProfile: 'Edit profile',
            addFriend: 'Add friend',
            removeFriend: 'Remove friend',
            noPosts: 'No posts',
            publish: 'Publish',
            addImages: 'Add images',
            whatsNew: 'What\'s new?',
            noFriends: 'You have no friends',
            friends: 'Friends',
            noResult: 'No result',
            Male: 'Male',
            Female: 'Female',
            search: 'Search',
            password: {
                oldP: 'Old password',
                newP: 'New password',
                confirmP: 'Confirm password',
                changeP: 'Change password',
            },
            logOut: 'Log Out',
            sidebar: {
                myAccount: 'My account',
                friends: 'Friends',
                searchPeople: 'Search people',
                newsFeed: 'News feed',
                settings: 'Settings',
            },
            settingsSidebar: {
                password: 'Password',
                language: 'Language',
            },
            form: {
                name: 'Name',
                surname: 'Surname',
                middleName: 'Middle Name',
                email: 'Email',
                age: 'Age',
                gender: {
                    male: 'Male',
                    female: 'Female',
                },
                password: 'Password',
                photoBtn: 'Upload Photo',
                signIn: 'Sign in',
                edit: 'Edit',
                logIn: 'Log In',
                haveAnAcc: 'Have an account?',
                haventAnAcc: 'Haven\'t got an account?',
                errors: {
                    required: 'Required',
                    ageError: 'Number from 1 to 99',
                    emailError: 'Enter a valid email address',
                    fileExt: 'Incorrect file extension',
                    wAndHError: 'Width and Height must be 200px or more',
                    fileSize: 'File size should be from 0.04 to 5 mb',
                    passwordErr: 'At least 10 symbols',
                    middleNameErr: 'Latin characters',
                }
            }
        },
    },
    ru: {
        application: {
            confirm: {
                deletePost: 'Удалить пост',
                removeFriend: 'Удалить друга',
                areYouSure: 'Вы уверены?'
            },
            deleteM: 'Удалить',
            removeM: 'Удалить',
            editProfile: 'Редактировать профиль',
            addFriend: 'Добавить в друзья',
            removeFriend: 'Удалить из друзей',
            noPosts: 'Нет постов',
            publish: 'Опубликовать',
            addImages: 'Добавить фотографии',
            whatsNew: 'Что нового?',
            noFriends: 'У вас нет друзей',
            friends: 'Друзья',
            noResult: 'Нет результата.',
            Male: 'Мужчина',
            Female: 'Женщина',
            search: 'Поиск',
            password: {
                oldP: 'Старый пароль',
                newP: 'Новый пароль',
                confirmP: 'Подтвердить пароль',
                changeP: 'Поменять пароль',
            },
            logOut: 'Выйти',
            sidebar: {
                myAccount: 'Моя страничка',
                friends: 'Друзья',
                searchPeople: 'Поиск',
                newsFeed: 'Новостная лента',
                settings: 'Настройки',
            },
            settingsSidebar: {
                password: 'Пароль',
                language: 'Язык',
            },
            form: {
                name: 'Имя',
                surname: 'Фамилия',
                middleName: 'Отчество',
                email: 'Email',
                age: 'Возраст',
                gender: {
                    male: 'Мужчина',
                    female: 'Женщина',
                },
                password: 'Пароль',
                photoBtn: 'Выбрать фотографию',
                signIn: 'Регистрация',
                edit: 'Редактировать',
                logIn: 'Войти',
                haveAnAcc: 'Есть аккаунт?',
                haventAnAcc: 'Нет аккаунта?',
                errors: {
                    required: 'Обязательное',
                    ageError: 'Число от 1 до 99',
                    emailError: 'Введите корректный email адресс',
                    fileExt: 'Недопустимое расширение файла',
                    wAndHError: 'Ширина и высота долэны быть не меньше 200px',
                    fileSize: 'Размер файла должен быть от 0.04 to 5 mb',
                    passwordErr: 'Минимум 10 символов',
                    middleNameErr: 'Латинские символы',
                }
            }
        },
    },
    ukr: {
        application: {
            header: 'Хидир'
        }
    }
};
