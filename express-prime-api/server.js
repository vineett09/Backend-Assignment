import express from 'express';

const app = express();
const PORT = 3000;

/**
 * Checks if a number is prime.
 * @param {number} n The number to check.
 * @returns {boolean} True if the number is prime, false otherwise.
 */
function isPrime(n) {
  // Prime numbers must be greater than 1.
  if (n <= 1) {
    return false;
  }
  // 2 is the only even prime number.
  if (n === 2) {
    return true;
  }
  // All other even numbers are not prime.
  if (n % 2 === 0) {
    return false;
  }

  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}

app.get('/isprime/:number', (req, res) => {
  const numberStr = req.params.number;
  const number = parseInt(numberStr, 10);

  if (isNaN(number)) {
    return res.status(400).json({
      error: 'Invalid input. Please provide a valid number.'
    });
  }

  const primeStatus = isPrime(number);

  const response = {
    number: number,
    is_prime: primeStatus,
  };

  res.json(response);
});

app.get('/', (req, res) => {
  res.send('Welcome! Use the /isprime/:number endpoint to check for a prime number.');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});