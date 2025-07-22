useEffect(() => {
  const loadQueryLimit = async () => {
    if (currentUser) {
      try {
        const { canQuery: canQueryValue, remainingQueries: remaining } = await checkQueryLimit(currentUser.uid);
        setCanQuery(canQueryValue);
        setRemainingQueries(remaining);
      } catch (error) {
        console.error('Error loading query limit:', error);
        // Default to allowing queries if there's an error
        setCanQuery(true);
        setRemainingQueries(5);
      }
    }
  };

  loadQueryLimit();
}, [currentUser]);

useEffect(() => {
  // Add welcome message on first load
  if (messages.length === 0) {
    const welcomeMessage: Message = {
      id: 'welcome',
      text: `Namaste! Main tumhara DSA Guru hun! 🙏\n\nMujhse koi bhi Data Structures aur Algorithms ka sawal pucho - Stack, Queue, Linked List, Trees, Sorting, Searching, Dynamic Programming, kuch bhi! Main tumhe College Senior ki tarah samjhaunga with detailed Java code examples.\n\nBas yaad rakhna - sirf DSA ke sawal karna, warna main naraz ho jaunga! 😄\n\n**Examples of questions you can ask:**\n- How does Binary Search work?\n- Implement Stack using Array\n- Explain Merge Sort algorithm\n- What is Dynamic Programming?\n- Solve Two Sum problem`,
      isUser: false,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }
}, [messages.length]);