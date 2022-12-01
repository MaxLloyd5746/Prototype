window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 600;
    let enemies = [];
    let gameFrame = 0;
    let coins =[];
    let score = 0;
    let gameOver = false;

    class InputHandler {
        constructor(){
            this.keys = [];
            this.fps = 60;
            this.keyTimer = 0;
            this.keyInterval = 1000/this.fps;
            window.addEventListener('keydown', e => {
                if ((       e.key === 'ArrowDown' ||
                            e.key === 'ArrowUp' ||
                            e.key === 'ArrowLeft' ||
                            e.key === 'ArrowRight' ||
                            e.key === 'Shift')
                            && this.keys.indexOf(e.key) === -1){
                                this.keys.push(e.key);
                }
                console.log(e.key, this.keys);
            });
            window.addEventListener('keyup', e => {
                if (        e.key === 'ArrowDown' ||
                            e.key === 'ArrowUp' ||
                            e.key === 'ArrowLeft' ||
                            e.key === 'ArrowRight'||
                            e.key === 'Shift'){
                            this.keys.splice(this.keys.indexOf(e.key), 1);
                }
                console.log(e.key, this.keys);
            });
        }
    }

    class Player {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 32;
            this.height = 32;
            this.x = 0;
            this.y = this.gameHeight - this.height;
            this.image = document.getElementById('player');
            this.frameX = 0;
            this.frameY = 0;
            this.maxFrame = 0;
            this.fps = 8;
            this.frameTimer = 0;
            this.frameInterval = 1000/this.fps;
            this.speedX = 0;
            this.speedY = 0;
            this.maxSpeed = 1.5;
  

        }
        draw(context){
            context.beginPath();
            context.arc(this.x + this.width/2, this.y + this.height/2, this.width/2.7, 0, Math.PI * 2);
            // context.stroke();
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height,
            this.width, this.height, this.x, this.y, this.width, this.height);
        }
        update(input, deltaTime, enemies, coins){
           
            enemies.forEach(enemy => {
                const dx = enemy.x - this.x;
                const dy = enemy.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < enemy.width/2 + this.width/2){
                    gameOver = true;
                }
                if (distance < enemy.width/2 + this.width/2){
                    enemy.x = this.x;
                    enemy.y = this.y;
                }
            });
            coins.forEach(coin => {
                const dx = coin.x - this.x;
                const dy = coin.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < coin.width/2 + this.width/2){
                    coinCounter--;
                    score++;
                    this.markedForDeletion = true;
                    if (score > 500)
                    gameOver = true;

                }
            });
            if (this.frameTimer > this.frameInterval){
                if (this.frameX >= this.maxFrame) this.frameX = 0;
                else this.frameX++;
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime;
            }
            this.x += this.speedX;
            this.y += this.speedY;

            if (input.keys.indexOf('ArrowRight') > -1){
                this.maxFrame = 3;
                this.speedX = this.maxSpeed;
                this.speedY = 0;
                this.frameY = 4;
                if (input.keys.indexOf('Shift') > -1){
                    this.maxFrame = 3;
                    this.speedX = 1.3 * this.maxSpeed;
                    this.speedY = 0
                    this.frameY = 9;
                }
                if (input.keys.indexOf('ArrowUp') > -1){
                    this.maxFrame = 3;
                    this.speedX = this.maxSpeed;
                    this.speedY = -this.maxSpeed;
                    this.frameY = 19;
                    if (input.keys.indexOf('Shift') > -1){
                        this.maxFrame = 3;
                        this.speedX = 1.3 * this.maxSpeed;
                        this.speedY = - 1.3 * this.maxSpeed;
                        this.frameY = 12;
                    }
                }
                if (input.keys.indexOf('ArrowDown') > -1){
                    this.maxFrame = 3;
                    this.speedX = this.maxSpeed;
                    this.speedY = this.maxSpeed;
                    this.frameY = 2;
                    if (input.keys.indexOf('Shift') > -1){
                        this.maxFrame = 3;
                        this.speedX = 1.3 * this.maxSpeed;
                        this.speedY = 1.3 * this.maxSpeed;
                        this.frameY = 7;
                    }
                }
            } else if (input.keys.indexOf('ArrowLeft') > -1){
                this.maxFrame = 3;
                this.speedX = -this.maxSpeed;
                this.speedY = 0;
                this.frameY = 3;
                if (input.keys.indexOf('Shift') > -1){
                    this.maxFrame = 3;
                    this.speedX = -1.3 * this.maxSpeed;
                    this.speedY = 0
                    this.frameY = 8;
                } 
                if (input.keys.indexOf('ArrowUp') > -1){
                    this.maxFrame = 3;
                    this.speedX = -this.maxSpeed;
                    this.speedY = -this.maxSpeed;
                     this.frameY = 18;
                    if (input.keys.indexOf('Shift') > -1){
                        this.maxFrame = 3;
                        this.speedX = -1.3 * this.maxSpeed;
                        this.speedY = -1.3 * this.maxSpeed;
                        this.frameY = 11;
                    }
                }
                if (input.keys.indexOf('ArrowDown') > -1){
                    this.maxFrame = 3;
                    this.speedX = -this.maxSpeed;
                    this.speedY = this.maxSpeed;
                     this.frameY = 1;
                    if (input.keys.indexOf('Shift') > -1){
                        this.maxFrame = 3;
                        this.speedX = -1.3 * this.maxSpeed;
                        this.speedY = 1.3 * this.maxSpeed;
                        this.frameY = 6;
                    }
                }
            } else if (input.keys.indexOf('ArrowUp') > -1){
                this.maxFrame = 3;
                this.speedY = -this.maxSpeed;
                this.speedX = 0;
                 this.frameY = 17;
                if (input.keys.indexOf('Shift') > -1){
                    this.maxFrame = 3;
                    this.speedY = -1.3 * this.maxSpeed;
                    this.speedX = 0
                    this.frameY = 10;
                }
            } else if (input.keys.indexOf('ArrowDown') > -1){
                this.maxFrame = 3;
                this.speedY = this.maxSpeed; 
                this.speedX = 0;
                 this.frameY = 0;
                if (input.keys.indexOf('Shift') > -1){
                    this.maxFrame = 3;
                    this.speedY = 1.3 * this.maxSpeed;
                    this.speedX = 0
                    this.frameY = 5;
                    
                }
            } else {
                this.maxFrame = 0;
                this.speedX = 0;
                this.speedY = 0;
            }
            if (this.x < 0) this.x = 0;
            else if (this.x > this.gameWidth - this. width) this.x = this.gameWidth - this.width;
            if (this.y < 0) this.y = 0;
            else if (this.y > this.gameHeight - this. height) this.y = this.gameHeight - this.height;

            
        }
    }

    class Background {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = document.getElementById('backgroundImage');
            this.width = 800;
            this.height = 600;
            this.x = 0;
            this.y = 0;
        }
        draw(context){
            context.drawImage(this.image,  this.x, this.y, this.width, this.height);
        }
    }

    class Enemy {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 16;
            this.height = 16;
            this.image = document.getElementById('enemy');
            this.x = Math.random() * (canvas.width - this.width);
            this.y = Math.random() * (canvas.height - this.height);
            this.newX = Math.random() * (canvas.width - this.width);
            this.newY = Math.random() * (canvas.height - this.height);
            this.frameX = 0;
            this.frameY = 0;
            this.maxFrame = 4;
            this.fps = 6;
            this.frameTimer = 0;
            this.frameInterval = 1000/this.fps;
            this.speedX = .1;
            this.speedY = .1;
            this.movementSpeed = Math.floor(Math.random() * 3 + 1);
            this.movementInterval = Math.floor(Math.random() * 200 + 50);
        }
        draw(context){
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height,
                this.width, this.height, this.x, this.y, this.width, this.height);
                context.beginPath();
                context.arc(this.x + this.width/2, this.y + this.height/2, this.width/2, 0, Math.PI * 2);
                
                
        }
        update(deltaTime){
            if (gameFrame % this.movementInterval == 0) {
            this.newX = Math.random() * (Math.random(5) * canvas.width - this.width);
            this.newY = Math.random(10) *  Math.random(5) * canvas.height - this.height;
            }
            let dx = this.x - this.newX;
            let dy = this.y - this.newY;
            this.x -= dx/1300;
            this.y -= dy/1300;
            if (gameFrame % this.movementSpeed == 0) {
                if (this.frameTimer > this.frameInterval){
                    if (this.frameY >= this.maxFrame) this.frameY = 0;
                    else this.frameY++;
                        this.frameTimer = 0;
                } else {
                    this.frameTimer += deltaTime;
                }
            }
            if (this.x < 0) this.x = 0;
            else if (this.x > this.gameWidth - this. width) this.x = this.gameWidth - this.width;
            if (this.y < 0) this.y = 0;
            else if (this.y > this.gameHeight - this. height) this.y = this.gameHeight - this.height;
        }
    }
    class Coin {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 8;
            this.height = 8;
            this.image = document.getElementById('coin');
            this.x = Math.random() * (canvas.width - this.width);
            this.y = Math.random() * (canvas.height - this.height);
            this.newX = Math.random() * (canvas.width - this.width);
            this.newY = Math.random() * (canvas.height - this.height);
            this.frameX = 0;
            this.frameY = 0;
            this.maxFrame = 3;
            this.fps = 20;
            this.frameTimer = 0;
            this.frameInterval = 1000/this.fps; 
            this.movementSpeed = Math.floor(Math.random() * 3 + 1);
            this.movementInterval = Math.floor(Math.random() * 200 + 50);      
        }
        draw(context){
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height,
                this.width, this.height, this.x, this.y, this.width, this.height);
                context.beginPath();
                context.arc(this.x + this.width/2, this.y + this.height/2, this.width/2, 0, Math.PI * 2);
                
                
        }
        update(deltaTime){
            if (gameFrame % this.movementInterval * 5 == 0) {
            this.newX = Math.random() * (Math.random(5) * canvas.width - this.width);
            this.newY = Math.random(10) *  Math.random(5) * canvas.height - this.height;
            }
            let dx = this.x - this.newX;
            let dy = this.y - this.newY;
            this.x -= dx/400;
            this.y -= dy/400;
            if (gameFrame % this.movementSpeed == 0) {
                if (this.frameTimer > this.frameInterval){
                    if (this.frameY >= this.maxFrame) this.frameY = 0;
                    else this.frameY++;
                        this.frameTimer = 0;
                } else {
                    this.frameTimer += deltaTime;
                }
            }
            if (this.x < 0) this.x = 0;
            else if (this.x > this.gameWidth - this. width) this.x = this.gameWidth - this.width;
            if (this.y < 0) this.y = 0;
            else if (this.y > this.gameHeight - this. height) this.y = this.gameHeight - this.height;
        }
    }

    let enemyCounter = 0;
    function handleEnemies(deltaTime) {
        if (enemyTimer > enemyInterval + randomEnemyInterval){
            enemies.push(new Enemy(canvas.width, canvas.height/2));
            randomEnemyInterval = Math.random() * 5000 + 500;
            enemyCounter++;
            enemyTimer = 0;
            if (enemyCounter >= 30) randomEnemyInterval = Math.random() * 5000000 + 500; 
        } else {
            enemyTimer += deltaTime;
        }
        enemies.forEach(enemy => {
                enemy.draw(ctx);
                enemy.update(deltaTime);
        });
        enemies = enemies.filter(enemy => !enemy.markedForDeletion);
    } 

    let coinCounter = 0;
    function handleCoins(deltaTime) {
        if (coinTimer > coinInterval){
            if (coins.push(new Coin(canvas.width, canvas.height/2)) * 10)
                coinCounter++;
                coinTimer = 0;
            coinInterval = Math.random() * 5000 + 500;
            if (coinCounter >= 2) coinInterval = Math.random() * 5000000 + 500; 
        } else {
            coinTimer += deltaTime;
        }
        coins.forEach(coin => {
            coin.draw(ctx);
            coin.update(deltaTime);
        });
    } 
    console.log(coinCounter);

    function displayStatusText(context) {
        context.font = '40 px Franklin Gothic Medium';
        context.fillstyle = 'black';
        context.fillText('Score' + score, 20, 50);
        if (gameOver){
            context.textAlign = 'center';
            context.fillstyle = 'black';
            context.fillText('Game Over!', canvas.width/2, 50);

        }

    }

    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);
    const background = new Background(canvas.width, canvas.height);
    
    let lastTime =0;
    let enemyTimer = 0;
    let enemyInterval = 1000;
    let randomEnemyInterval = Math.random() * 5000 + 200;
    let coinTimer = 0;
    let coinInterval = 6000;

    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        background.draw(ctx);
        player.draw(ctx);
        player.update(input, deltaTime, enemies, coins);
        handleEnemies(deltaTime);
            // console.log(deltaTime);
        handleCoins(deltaTime);
        displayStatusText(ctx);
        gameFrame++;
        if (!gameOver) requestAnimationFrame(animate);
         window.location.reload();
         
    }
    animate(0);

});