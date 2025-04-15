// data/sortingAlgorithms.ts

export interface SortingAlgorithm {
  name: string;
  description: string;
  bestCaseTimeComplexity: string;
  averageCaseTimeComplexity: string;
  worstCaseTimeComplexity: string;
  spaceComplexity: string;
  stable: boolean;
}

export const sortingAlgorithms: Record<string, SortingAlgorithm> = {
  bubbleSort: {
    name: "Bubble Sort",
    description:
      "Bubble Sort is one of the simplest sorting algorithms. It compares adjacent elements and swaps them if they are in the wrong order. This process is repeated for each element in the array, iterating over the array multiple times until no swaps are needed, which indicates the array is sorted. Despite its simplicity, Bubble Sort is inefficient on large lists and has a time complexity of O(n²) in the average and worst cases. It's often used as an educational tool to introduce sorting concepts, but it's not practical for real-world applications with large datasets.",
    bestCaseTimeComplexity: "O(n)",
    averageCaseTimeComplexity: "O(n^2)",
    worstCaseTimeComplexity: "O(n^2)",
    spaceComplexity: "O(1)",
    stable: true,
  },
  insertionSort: {
    name: "Insertion Sort",
    description:
      "Insertion Sort builds the sorted array one element at a time. It works similarly to how you might sort playing cards in your hands: you pick up one card at a time and insert it into its correct position among the previously sorted cards. While it is very efficient for small datasets or nearly sorted arrays, its time complexity grows quadratically (O(n²)) as the input size increases. It's a stable sort, meaning that equal elements retain their relative order, and it’s useful when the dataset is nearly sorted or small in size.",
    bestCaseTimeComplexity: "O(n)",
    averageCaseTimeComplexity: "O(n^2)",
    worstCaseTimeComplexity: "O(n^2)",
    spaceComplexity: "O(1)",
    stable: true,
  },
  selectionSort: {
    name: "Selection Sort",
    description:
      "Selection Sort works by finding the smallest (or largest) element in the unsorted part of the array and swapping it with the first unsorted element. This process continues until all elements are sorted. While simple, Selection Sort is inefficient on large lists, as it always performs O(n²) comparisons, even if the array is already sorted. The algorithm is not stable, meaning that equal elements may change relative order. Selection Sort is not commonly used in practice, but it has the advantage of requiring minimal memory (O(1) space).",
    bestCaseTimeComplexity: "O(n^2)",
    averageCaseTimeComplexity: "O(n^2)",
    worstCaseTimeComplexity: "O(n^2)",
    spaceComplexity: "O(1)",
    stable: false,
  },
  quickSort: {
    name: "Quick Sort",
    description:
      "Quick Sort is a highly efficient divide-and-conquer sorting algorithm. It works by selecting a 'pivot' element and partitioning the array into two sub-arrays: one with elements less than the pivot and one with elements greater than the pivot. This partitioning step is recursively applied to each sub-array. Quick Sort is generally faster than other O(n²) algorithms like Bubble Sort and Selection Sort, and it has an average time complexity of O(n log n). However, in the worst case, it can degrade to O(n²) if the pivot choices are poor, but this can be mitigated with strategies like random pivot selection or using the median-of-three rule. Despite being fast in practice, Quick Sort is not a stable sort.",
    bestCaseTimeComplexity: "O(n log n)",
    averageCaseTimeComplexity: "O(n log n)",
    worstCaseTimeComplexity: "O(n^2)",
    spaceComplexity: "O(log n)",
    stable: false,
  },
  mergeSort: {
    name: "Merge Sort",
    description:
      "Merge Sort is another divide-and-conquer algorithm that splits the array into two halves, recursively sorts each half, and then merges them back together in sorted order. Merge Sort has a consistent time complexity of O(n log n) in the best, average, and worst cases, making it a reliable choice for large datasets. It’s also a stable sort, meaning that the relative order of equal elements is preserved. However, Merge Sort requires additional space proportional to the size of the input array (O(n)) for storing the sub-arrays during the merge phase, making it less space-efficient than some other algorithms like Quick Sort. Despite this, it’s often used in situations where stability is required.",
    bestCaseTimeComplexity: "O(n log n)",
    averageCaseTimeComplexity: "O(n log n)",
    worstCaseTimeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    stable: true,
  },
  heapSort: {
    name: "Heap Sort",
    description:
      "Heap Sort is based on a binary heap data structure, where the elements are arranged in a tree-like structure that satisfies the heap property (parent nodes are greater or smaller than their children). The algorithm works by repeatedly extracting the root of the heap and placing it at the end of the array. While Heap Sort guarantees a time complexity of O(n log n) in all cases, it is not a stable sort. Heap Sort also has the advantage of requiring O(1) additional space, making it more space-efficient than Merge Sort. However, its slower constant factors compared to Quick Sort and Merge Sort make it less preferred in practice for general sorting tasks.",
    bestCaseTimeComplexity: "O(n log n)",
    averageCaseTimeComplexity: "O(n log n)",
    worstCaseTimeComplexity: "O(n log n)",
    spaceComplexity: "O(1)",
    stable: false,
  },
  radixSort: {
    name: "Radix Sort",
    description:
      "Radix Sort is a non-comparative sorting algorithm that works by sorting the input numbers digit by digit, starting from the least significant digit. It uses a stable sub-sorting algorithm, such as counting sort, to sort digits at each step. Radix Sort is particularly effective when sorting integers or strings, and its time complexity is O(nk), where 'n' is the number of elements and 'k' is the number of digits. While Radix Sort has excellent performance for certain types of data, it requires additional space and is generally not applicable to floating-point numbers or comparisons of arbitrary objects. It is a stable sort, and its efficiency increases as the range of the input data decreases.",
    bestCaseTimeComplexity: "O(nk)",
    averageCaseTimeComplexity: "O(nk)",
    worstCaseTimeComplexity: "O(nk)",
    spaceComplexity: "O(n + k)",
    stable: true,
  },
  bucketSort: {
    name: "Bucket Sort",
    description:
      "Bucket Sort divides the input into a number of 'buckets' based on a specific range of values. Each bucket is then sorted individually, often using a different sorting algorithm like insertion sort. Finally, the sorted buckets are concatenated together to form the sorted output. Bucket Sort is particularly effective when the input data is uniformly distributed across a known range, and it can achieve linear time complexity O(n + k) in the best and average cases. However, in the worst case, when all elements fall into the same bucket, its time complexity can degrade to O(n²). It is a stable sort and requires additional space for the buckets.",
    bestCaseTimeComplexity: "O(n + k)",
    averageCaseTimeComplexity: "O(n + k)",
    worstCaseTimeComplexity: "O(n^2)",
    spaceComplexity: "O(n + k)",
    stable: true,
  },
};
