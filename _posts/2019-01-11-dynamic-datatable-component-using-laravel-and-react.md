---
title: "Dynamic Datatable component using Laravel and React Js"
date: 2019-01-11 19:57:00
categories: [React Laravel]
tags: [React Laravel]
---

Hey Guys! I hope you guys are doing good, I am also doing good too and It's been some months I am learning React Js. A few days back one of my brother [Bijaya](https://medium.com/@sadhakbj) wrote an article about [creating a dynamic datatable component using Laravel and Vue Js](https://medium.com/@sadhakbj/create-dynamic-data-table-component-with-laravel-and-vue-js-part-1-d1799677b539). Now I want to do the same implementation using Laravel and React Js. Let's see how it goes.

**TL;DR: Steps to create a dynamic datatable using React and Laravel. Some code snippet and some explanation is in this article. And demo application can be found here with installation instructions.**

Requirements:
1. Laravel 5.5+
2. React Js

Let's create a Laravel Project and set environment variables and database, change the migration file of users as we are going to create a datatable of users records.
<script src="https://gist.github.com/madhusudhan1234/946a23f0e50e5c450ad0d1ae2947c342.js"></script>

Run the migration using the command: ```$ php artisan migrate```  which runs the migration for the project and new users table is created in our database.
The user model already exists in Laravel just update the fillable fields as we are adding address field in users table.

`protected $fillable = ['name', 'email', 'password', 'address'];`

We will create by adding a route. So inside the `routes/api.php` add a new route with get request:

```$this->get('users', 'UsersController@index')->name('users');```

Now we need to create a controller using command ```php artisan make:controller UserController``` in the index method to fetch paginated records of users and return in JSON format. This controller is created inside app/Http/Controllers make changes followings.
<script src="https://gist.github.com/madhusudhan1234/ae5247ecdf7a70c8136a79665c01dbc3.js"></script>

Here we can see UsersResource class is used there but we have not created yet. Laravel's resource classes allow you to expressively and easily transform your models and model collections into JSON. So hurry up! Run command ```php artisan make:resource UserResource``` This class will be created inside app/Http/Resources. Add the following code in a toArray method that will only return id, name, email, address and created_at fields of the users from API.
<script src="https://gist.github.com/madhusudhan1234/b3bfb229a752c9dbd9eaf3a46122569d.js"></script>

Our user list API is completed but we are not adding any data to the user's table so let's do this too. To insert the random data of users for now we can make a change in database/factories/UserFactory.php class. The following method is useful to generate random data of users by using [Faker](https://github.com/fzaninotto/Faker) Library and Faker is by default configured in Laravel.
<script src="https://gist.github.com/madhusudhan1234/2cbc516f1f19b74958bd1057ccd3f8b9.js"></script>

And create a seeder file by using a command ```php artisan make:seed UsersTableSeeder```  which will create a file UsersTableSeeder.php inside database/seeds directory. Inside run method add the following, Which can generate 50 random users.

`factory(App\User::class, 50)->create()`

Let's insert those random 50 users data by using a command ```$ php artisan db:seed```.

Start your Laravel project in a local environment and open your app in a favorite browser like

```http://yourappurl.local/api/users/?per_page=2&column=name&order=desc```

You can see the following results:
![Result from API](https://cdn-images-1.medium.com/max/1600/1*L81ZGXN6EXfU3YXOkTFu3g.png)

Okay, cool! Backend listing API is completed, Now let's move to the frontend part. <hr/>

We are going to use React Js so first generate react preset in Laravel project by using a command ```$ php artisan preset react``` which will generate a scaffold for react starter architecture by default. Let's create ReactDataTableApp.js file in resources/js which looks like this.
<script src="https://gist.github.com/madhusudhan1234/c65a74cd8a1f26342fc4e2b5e678ec0b.js"></script>

We are using DataTable component in an above component, and passing props URL and columns so that it will make DataTable component to dynamic. So Let's create a DataTable.js file inside resources/js/components which looks like this.
<script src="https://gist.github.com/madhusudhan1234/38de191922b7ec9ae6a8357b5c57f149.js"></script>

I want to explain a little bit about the DataTable component, In the above code, you can see we are initializing states entities data and meta information will be set on the state after fetch data from fetch API of any entity. To fetch the data from API we are using [axios](https://github.com/axios/axios) which is defined in the resources/js/bootstrap.js file. Entities list is available in this.state.entities.data and meta information for the pagination and API calls are in this.state.entities.meta. There is the listing of the entity's records done with pagination. Also, we can make separate Pagination component and reuse for several tables as well.

Import the ReactDataTableApp Component in resources/js/app.js and render that component in the welcome.blade.php file at where datatable id attribute is defined in markup.
<script src="https://gist.github.com/madhusudhan1234/915838f58d7d0e68a36c72e1c593e255.js"></script>

And in the welcome.blade.php just give the link of js file and css file with appropriate identifier something like this.
<script src="https://gist.github.com/madhusudhan1234/3190fb81ebf4a3300acb3c59b8d3216c.js"></script>

Now let's run your app and see in the browser, Hope you do not forget to run ```$ npm i``` and ```$ npm run dev``` . Open your application in your favorite browser then you can see dynamic datatable in it.

![Dynamic Datatable Using React and Laravel](https://cdn-images-1.medium.com/max/2600/1*W2LXEjJCp2nALFGJfzKWwQ.png)

Yes, that is all about for this article, we created a Dynamic datatable using Laravel and React Js. Here is the Github repo, If you have any queries or suggestions regarding this feel free to add on a comment section. I always love your responses. Thanks! Bye!
