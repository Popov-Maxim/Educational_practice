const adList = new AdList([
    {
        id: '1',
        description: 'Скидка на стулья - до 15%',
        createdAt: new Date('2021-03-15T23:00:00'),
        link: 'https://coolchairs.com',
        vendor: 'Chair Service',
        photoLink: 'https://i.pinimg.com/originals/1d/ec/8e/1dec8e1a33e7b4891bec2ba030ccc931.jpg',
        validUntil: new Date('2021-06-01T23:00:00'),
        discount: '15%',
        hashTags: ['tagLOL', 'tag2'],
        rating: 4
    },

    {
        id: '2',
        description: 'Вот вам яркий пример  -  плановых заданий обеспечивает широкому кругу (специалистов) участие в формировании системы обучения кадров, соответствующей насущным потребностям.',
        createdAt: new Date('2021-01-15T23:00:00'),
        link: 'https://coolchairs.com',
        vendor: 'Romus Brands',
        photoLink: 'https://pbs.twimg.com/media/DyfDA0gXQAAom3b?format=jpg&name=small',
        validUntil: new Date('2021-06-01T23:00:00'),
        discount: '20%',
        hashTags: ['furniture', 'chairs', 'tag1', 'tag2'],
        reviews: ['fefefe']
    }
]);

let page = new Page();
page.root = 'post-feed';
page.nameUser = 'Romus Brands';
page.adList = adList;
page.showAds();
page.showHead();
page.showSelectVendor();