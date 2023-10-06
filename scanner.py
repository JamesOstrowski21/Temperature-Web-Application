import numpy as np
import matplotlib.pyplot as plt

# Define the range of N values from 5 to 1000
N_values = np.arange(5, 1001)

# Calculate the maximum of the two functions for each N
max_values = np.maximum((500 / 125), 500 / 75)
max_values_N = np.maximum((500 / 125), np.maximum(500 / 75, (500 / 125 + N_values * 15)))

# Create the plot
plt.figure(figsize=(10, 6))
plt.plot(N_values, max_values, label='max(500/125, 500/75)')
plt.plot(N_values, max_values_N, label='max(500/125, 500/75, 500/125 + N*15)')
plt.xlabel('N')
plt.ylabel('Maximum Value')
plt.title('Maximum of Two Functions vs. N')
plt.legend()
plt.grid(True)
plt.show()
