using UnityEngine;
using UnityEngine.UI;

public class GameManager : MonoBehaviour
{
    public static GameManager Instance { get; private set; }

    public Text scoreText;
    public GameObject gameOverPanel;

    float score;
    bool running = false;

    void Awake()
    {
        if (Instance == null) Instance = this;
        else Destroy(gameObject);
    }

    void Start()
    {
        NewRun();
    }

    void Update()
    {
        if (!running) return;
        score += Time.deltaTime * 10f; // distance-based scoring
        scoreText.text = Mathf.FloorToInt(score).ToString();
    }

    public void NewRun()
    {
        score = 0;
        running = true;
        gameOverPanel.SetActive(false);
        // reset player position, spawner, etc.
    }

    public void PlayerDied()
    {
        running = false;
        gameOverPanel.SetActive(true);
        // show final score, enable restart button
    }

    public void OnRestartButton()
    {
        // reload scene or reset objects
        UnityEngine.SceneManagement.SceneManager.LoadScene(UnityEngine.SceneManagement.SceneManager.GetActiveScene().name);
    }
}
